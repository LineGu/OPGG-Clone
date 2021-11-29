import { IInGameData, IMostInfoDTO, ISummoner, ISummonerDTO, IWinRateData } from '@types';

const SUCCESS = 'SUCCESS' as const;
const ERROR = 'ERROR' as const;
const LOADING = 'LOADING' as const;

export const success = (summonerData: ISummonerDTO, winRateData: IWinRateData) => ({
  type: SUCCESS,
  summonerData,
  winRateData,
});

export const error = (err: Error | null) => ({
  type: ERROR,
  err,
});

export const loading = () => ({
  type: LOADING,
});

export type DataGetterAction =
  | ReturnType<typeof success>
  | ReturnType<typeof error>
  | ReturnType<typeof loading>;

export type SummonerDataType = {
  basicData: ISummoner;
  winRateData: IMostInfoDTO;
};

export interface ISummonerDataState {
  summonerData: SummonerDataType;
  loading: boolean;
  error: Error | null;
}

export default function summonerDataReducer(
  state: ISummonerDataState,
  action: DataGetterAction
): ISummonerDataState {
  switch (action.type) {
    case LOADING:
      return { summonerData: state.summonerData, loading: true, error: null };

    case ERROR: {
      return { summonerData: state.summonerData, loading: false, error: action.err };
    }

    case SUCCESS: {
      const summonerTotalData = {
        basicData: action.summonerData.summoner,
        winRateData: action.winRateData.winRateData,
      };
      return { summonerData: summonerTotalData, loading: false, error: null };
    }

    default: {
      const { type } = action;
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}

export const getMappingDispatcher = (dispatch: React.Dispatch<DataGetterAction>) => {
  return {
    loading() {
      dispatch({ type: LOADING });
    },

    success(summonerData: ISummonerDTO, winRateData: IWinRateData) {
      dispatch({ type: SUCCESS, summonerData, winRateData });
    },

    error(err: Error) {
      dispatch({ type: ERROR, err });
    },
  };
};
