import React from 'react';
import { useParams } from 'react-router-dom';

import SUMMONER_API from '@api/summoner';
import useLanguage from '@hooks/useLanguage';
import useHandleAPIError from '@hooks/useHandleAPIError';
import summonerDataReducer, {
  IInGameDataState,
  getMappingDispatcher,
} from '@models/InGameData/stateManageTools';
import { IInGameData, IInitData, IParentComponentProps, IRecentGameData } from '@types';

type RecentGamesType = IInGameData[];

export interface IInGameDataProviderValue extends IInGameDataState {
  getInGameData: () => Promise<void>;
  getRecentGames: (
    data: Map<string, IInGameData>,
    cnt: number,
    type?: 'solo' | 'free' | 'total'
  ) => RecentGamesType;
  reviseGameDatas: (recentGamesData: RecentGamesType) => IRecentGameData;
}

interface InGameDataProps extends IParentComponentProps {
  initData: IInitData;
}

export const InGameDataContext = React.createContext<IInGameDataProviderValue | null>(null);

const initState = (initData: IInitData): IInGameDataState => ({
  inGameData: initData.inGameData,
  error: null,
  loading: false,
});

let isFirstRender = true;

function InGameDataProvider({ children, initData }: InGameDataProps) {
  const { summonerName } = useParams() as { summonerName: string };
  const { language } = useLanguage();
  const { errorHandler } = useHandleAPIError();

  const [inGameDataState, dispatch] = React.useReducer(summonerDataReducer, initState(initData));
  const { current: dispatcher } = React.useRef(getMappingDispatcher(dispatch));

  const getInGameData = async () => {
    try {
      dispatcher.loading();

      const inGameData = await SUMMONER_API.getInGameData(summonerName, language);
      dispatcher.success(inGameData);
    } catch (err) {
      errorHandler(err, summonerName);
    }
  };

  const getRecentGames = (
    data: Map<string, IInGameData>,
    cnt: number,
    type: 'solo' | 'free' | 'total' = 'total'
  ): RecentGamesType => {
    const mapIter = data.keys();
    const mapSize = data.size;
    const gameNum = mapSize < cnt ? mapSize : cnt;

    let gameType;
    switch (type) {
      case 'solo':
        gameType = '솔랭';
        break;

      case 'free':
        gameType = '자유 5:5 랭크';
        break;

      default:
        gameType = 'total';
        break;
    }

    const recentGames: RecentGamesType = [];
    for (let i = 0; i < gameNum; i++) {
      const key = mapIter.next().value;
      const value = data.get(key);
      if (!value || (gameType !== 'total' && value.gameData.gameType !== gameType)) continue;
      recentGames.push(value);
    }
    return recentGames;
  };

  const reviseGameDatas = (games: RecentGamesType): IRecentGameData => {
    const revisedData = games.reduce(
      (acc, gameData) => {
        if (gameData.gameData.isWin) acc.win += 1;
        else acc.loss += 1;

        acc.kill += gameData.gameData.stats.general.kill;
        acc.death += gameData.gameData.stats.general.death;
        acc.assist += gameData.gameData.stats.general.assist;
        acc.kda += parseInt(gameData.gameData.stats.general.kdaString);
        acc.rate = (acc.win * 100) / (acc.win + acc.loss);

        const champName = gameData.gameData.champion.imageUrl
          .split('/')
          .pop()
          ?.split('.')[0] as string;
        if (!acc.perChamp[champName])
          acc.perChamp[champName] = {
            cnt: 0,
            win: 0,
            loss: 0,
            rate: 0,
            kda: 0,
            img: gameData.gameData.champion.imageUrl,
            name: champName,
          };
        acc.perChamp[champName].cnt += 1;
        if (gameData.gameData.isWin) {
          acc.perChamp[champName].win += 1;
        } else {
          acc.perChamp[champName].loss += 1;
        }
        acc.perChamp[champName].rate =
          (acc.perChamp[champName].win * 100) /
          (acc.perChamp[champName].win + acc.perChamp[champName].loss);

        acc.perChamp[champName].kda += parseInt(gameData.gameData.stats.general.kdaString);
        return acc;
      },
      { win: 0, loss: 0, rate: 0, kill: 0, death: 0, assist: 0, kda: 0, perChamp: {}, perLine: {} }
    );
    const totalGame = revisedData.win + revisedData.loss;
    revisedData.kda = revisedData.kda / totalGame;

    Object.keys(revisedData.perChamp).forEach((key) => {
      revisedData.perChamp[key].kda = revisedData.perChamp[key].kda / revisedData.perChamp[key].cnt;
    });
    return revisedData;
  };

  React.useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }
    if (summonerName) getInGameData();
  }, [summonerName]);

  return (
    <InGameDataContext.Provider
      value={{ getInGameData, getRecentGames, reviseGameDatas, ...inGameDataState }}
    >
      {children}
    </InGameDataContext.Provider>
  );
}

export default InGameDataProvider;
