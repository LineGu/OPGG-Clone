import { SummonerDataType } from '@models/SummonerData/stateManageTools';

export { SummonerDataType };

export interface IInitData {
  summonerData: ISummonerDTO;
  winRateData: IWinRateData;
  inGameData: Map<string, IInGameData>;
}

export interface IInGameData {
  gameData: IGameInfo;
  participantInfo: IMatchDetailDTO;
}

export interface IWinRateData {
  winRateData: IMostInfoDTO;
}

export interface IMostInfoDTO {
  champions: IMostChampion[];
  recentWinRate: IChampionWinRate[];
}

export interface ISummonerDTO {
  summoner: ISummoner;
}

export interface IMatchesDTO {
  champions: IChampion[];
  games: IGameInfo[];
  positions: IPosition[];
  summary: ISummary;
}

export interface IMatchDetailDTO {
  gameId: string;
  teams: ITeam[];
}

export interface IChampion {
  imageUrl: string;
  level: number;
  name?: string;
}

export interface IChampionWinRate {
  id: number;
  imageUrl: string;
  key: string;
  losses: number;
  name: string;
  wins: number;
}

export interface IImageObj {
  imageUrl: string;
}

export interface IFellowPlayer {
  champion: IChampion;
  summonerId: string;
  summonerName: string;
}

export interface IGameInfoStats {
  general: IGeneral;
  ward: IWard;
}

export interface IGameInfo {
  champion: IChampion;
  createDate: number;
  gameId: string;
  gameLength: number;
  gameType: string;
  isWin: boolean;
  items: IImageObj[];
  mapInfo: IMapInfo;
  mmr: number;
  needRenew: boolean;
  peak: string[];
  spells: IImageObj[];
  stats: IGameInfoStats;
  summonerId: string;
  summonerName: string;
  tierRankShort: string;
}

export interface IGeneral {
  assist: number;
  contributionForKillRate: string;
  cs: number;
  csPerMin: number;
  death: number;
  goldEarned: number;
  kdaString: string;
  kill: number;
  largestMultiKillString: string;
  opScoreBadge: string;
  totalDamageDealtToChampions: number;
}
export interface IWard {
  sightWardsBought: number;
  visionWardsBought: number;
}

export interface IMapInfo {
  imageUrl: string;
  mapId: number;
}

export interface ILadderRank {
  rank: number;
  rankPercentOfTop: number;
}

export interface ILeague {
  hasResults: boolean;
  losses: number;
  tierRank: ITierRank;
  wins: number;
}

export interface ITeam {
  players: IFellowPlayer[];
  teamId: number;
}

export interface IPosition {
  games: number;
  losses: number;
  position: string;
  positionName: string;
  wins: number;
}

export interface ISummary {
  assists: number;
  deaths: number;
  kills: number;
  losses: number;
  wins: number;
}

export interface IMostChampion {
  assists: number;
  cs: number;
  deaths: number;
  games: number;
  id: number;
  imageUrl: string;
  key: string;
  kills: number;
  losses: number;
  name: string;
  rank: number;
  wins: number;
}

export interface ISummoner {
  ladderRank: ILadderRank;
  leagues: ILeague[];
  level: number;
  name: string;
  previousTiers: ITierRank[];
  profileBackgroundImageUrl: string;
  profileBorderImageUrl: string;
  profileImageUrl: string;
  url: string;
  id: string;
}

export interface ITierRank {
  division: string;
  imageUrl: string;
  lp: number;
  name: string;
  season: number;
  shortString: string;
  string: string;
  tier: string;
  tierDivision: string;
  tierRankPoint: number;
}

export interface IRecentGameData {
  win: number;
  loss: number;
  rate: number;
  kill: number;
  death: number;
  assist: number;
  kda: number;
  perChamp: { [champName: string]: IRecentGameDataPerChamp };
  perLine: {};
}

export interface IRecentGameDataPerChamp {
  cnt: number;
  win: number;
  loss: number;
  kda: number;
  rate: number;
  img: string;
  name: string;
}
