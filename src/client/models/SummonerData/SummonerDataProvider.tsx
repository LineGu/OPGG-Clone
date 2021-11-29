import { IInitData, IParentComponentProps, ISummonerDTO, IWinRateData } from '@types';
import React from 'react';
import { useParams } from 'react-router-dom';

import SUMMONER_API from '@api/summoner';
import useLanguage from '@hooks/useLanguage';
import useHandleAPIError from '@hooks/useHandleAPIError';
import { resolveAsyncsInParallel } from '@utils/api';
import summonerDataReducer, {
  ISummonerDataState,
  getMappingDispatcher,
} from '@models/SummonerData/stateManageTools';

export interface ISummonerDataProviderValue extends ISummonerDataState {
  getSummonerData: () => Promise<void>;
  getSummaryInfo: (name?: string) => Promise<ISummonerDTO>;
  getWinRateData: (name?: string) => Promise<IWinRateData>;
  preSummoners: string[];
}

interface IInitDataProps extends IParentComponentProps {
  initData: IInitData;
}

export const SummonerDataContext = React.createContext<ISummonerDataProviderValue | null>(null);

const initState = (initData: IInitData): ISummonerDataState => ({
  summonerData: {
    basicData: initData.summonerData.summoner,
    winRateData: initData.winRateData.winRateData,
  },
  error: null,
  loading: false,
});

let isFirstRender = true;

function SummonerDataProvider({ children, initData }: IInitDataProps) {
  const { summonerName } = useParams() as { summonerName: string };
  const { language } = useLanguage();
  const { errorHandler } = useHandleAPIError();

  const [summonerDataState, dispatch] = React.useReducer(summonerDataReducer, initState(initData));
  const { current: dispatcher } = React.useRef(getMappingDispatcher(dispatch));
  const [preSummoners, setPreSummoners] = React.useState<string[]>([]);

  const getSummaryInfo = async (name = summonerName): Promise<ISummonerDTO> => {
    return await SUMMONER_API.getSummaryInfo(name, language);
  };

  const getWinRateData = async (name = summonerName): Promise<IWinRateData> => {
    return await SUMMONER_API.getWinRateData(name, language);
  };

  const getSummonerData = async () => {
    try {
      dispatcher.loading();

      const [summonerData, winRateData] = (await resolveAsyncsInParallel(
        getSummaryInfo,
        getWinRateData
      )) as [ISummonerDTO, IWinRateData];

      dispatcher.success(summonerData, winRateData);
    } catch (err) {
      errorHandler(err, summonerName);
    }
  };

  const saveSummonerHistory = (newSummoner: string) => {
    const preSummonersStr = localStorage.getItem('summoners') ?? '[]';
    const preSummoners = JSON.parse(preSummonersStr) as string[];
    const preSummonersSet = new Set(preSummoners);
    preSummonersSet.add(newSummoner);
    const preSummonersArr = Array.from(preSummonersSet);
    localStorage.setItem('summoners', JSON.stringify(preSummonersArr));
    setPreSummoners(preSummonersArr);
  };

  React.useEffect(() => {
    saveSummonerHistory(summonerName);
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }
    if (summonerName) getSummonerData();
  }, [summonerName]);

  return (
    <SummonerDataContext.Provider
      value={{
        getSummonerData,
        getSummaryInfo,
        getWinRateData,
        preSummoners,
        ...summonerDataState,
      }}
    >
      {children}
    </SummonerDataContext.Provider>
  );
}

export default SummonerDataProvider;
