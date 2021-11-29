import {
  IMatchesDTO,
  IMostInfoDTO,
  IMatchDetailDTO,
  ISummonerDTO,
  IInGameData,
  IWinRateData,
} from 'src/types';
import axios from 'axios';
import { LanguageType, DEFAULT_LANG } from '@models/LanguageData/LanguageProvider';
import { resolveAsyncsInParallel } from '@utils/api';
import { CHAMP_DICT } from '../constants/champDict';

const BASE_URL = 'https://codingtest.op.gg/';

const BASE_ROUTE = '/api/summoner/';

const getDictionary = () => {
  const dictionary = new Map();
  Object.entries(CHAMP_DICT).map(([ko, value]) => {
    dictionary.set(value.englishName, ko);
  });
  return dictionary;
};

export const dictionary = getDictionary();

const getSummaryInfo = async (
  summonerName: string,
  language: LanguageType = DEFAULT_LANG
): Promise<ISummonerDTO> => {
  const URL = `${BASE_URL + BASE_ROUTE + summonerName}?hl=${language}`;
  const { data } = await axios.get<ISummonerDTO>(URL);
  data.summoner.previousTiers.reverse();

  const currentSoloRankTierInfo = data.summoner.leagues[0].tierRank;
  data.summoner.previousTiers.push(currentSoloRankTierInfo);

  let previousSeason: number = data.summoner.previousTiers[0].season;
  data.summoner.previousTiers.forEach(({ season }, idx) => {
    let revisedSeason = season ?? previousSeason + 1;
    revisedSeason = revisedSeason === 10 ? 2020 : revisedSeason;
    revisedSeason = revisedSeason === 11 ? 2021 : revisedSeason;
    data.summoner.previousTiers[idx].season = revisedSeason;
    previousSeason = revisedSeason;
  });

  return data;
};

const getParticipantInfo = async (
  summonerName: string,
  gameId: string,
  language: LanguageType = DEFAULT_LANG
): Promise<IMatchDetailDTO> => {
  const URL = `${BASE_URL + BASE_ROUTE + summonerName}/matchDetail/${gameId}?hl=${language}`;
  const { data } = await axios.get<IMatchDetailDTO>(URL);
  return data;
};

const getInGameSelfData = async (
  summonerName: string,
  language: LanguageType = DEFAULT_LANG
): Promise<IMatchesDTO> => {
  const URL = `${BASE_URL + BASE_ROUTE + summonerName}/matches?hl=${language}`;
  const { data } = await axios.get<IMatchesDTO>(URL);
  return data;
};

const sortByTotalGameCnt = (prev, next) => {
  if (prev.wins + prev.losses > next.wins + next.losses) return -1;
  return 1;
};

const getWinRateData = async (
  summonerName: string,
  language: LanguageType = DEFAULT_LANG
): Promise<IWinRateData> => {
  const URL = `${BASE_URL + BASE_ROUTE + summonerName}/mostInfo?hl=${language}`;
  const { data } = await axios.get<IMostInfoDTO>(URL);
  data.champions.sort(sortByTotalGameCnt);
  data.recentWinRate.sort(sortByTotalGameCnt);
  return { winRateData: data };
};

const getChampNameByUrl = (url: string) => url.split('/').pop()?.split('.')[0];

const getInGameData = async (summonerName: string, language: LanguageType = DEFAULT_LANG) => {
  const inGameData = await getInGameSelfData(summonerName, language);
  const GameInfoGetterFuncs = inGameData.games.map((game) => {
    return () => getParticipantInfo(summonerName, game.gameId, language);
  });

  const revisedResults = (await resolveAsyncsInParallel(
    ...GameInfoGetterFuncs
  )) as IMatchDetailDTO[];

  const gameInfo = new Map<string, IInGameData>();
  inGameData.games.forEach((game, idx) => {
    const matchDetailInfo = revisedResults[idx];
    if (matchDetailInfo) {
      const enName = getChampNameByUrl(inGameData.games[idx].champion.imageUrl);
      inGameData.games[idx].champion.name = dictionary.get(enName?.toLowerCase()) ?? enName;
      gameInfo.set(game.gameId, {
        gameData: inGameData.games[idx],
        participantInfo: matchDetailInfo,
      });
    }
  });

  return gameInfo;
};

const SUMMONER_API = {
  getSummaryInfo,
  getParticipantInfo,
  getInGameSelfData,
  getWinRateData,
  getInGameData,
};

export default SUMMONER_API;
