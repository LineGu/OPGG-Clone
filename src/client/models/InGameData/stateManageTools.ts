import { IInGameData } from 'src/types';

const SUCCESS = 'SUCCESS' as const;
const ERROR = 'ERROR' as const;
const LOADING = 'LOADING' as const;

export const success = (inGameData: Map<string, IInGameData>) => ({
  type: SUCCESS,
  inGameData,
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

export interface IInGameDataState {
  inGameData: Map<string, IInGameData>;
  loading: boolean;
  error: Error | null;
}

export default function inGameDataReducer(
  state: IInGameDataState,
  action: DataGetterAction
): IInGameDataState {
  switch (action.type) {
    case LOADING:
      return { inGameData: state.inGameData, loading: true, error: null };

    case ERROR: {
      return { inGameData: state.inGameData, loading: false, error: action.err };
    }

    case SUCCESS: {
      return { inGameData: action.inGameData, loading: false, error: null };
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

    success(inGameData: Map<string, IInGameData>) {
      dispatch({ type: SUCCESS, inGameData });
    },

    error(err: Error) {
      dispatch({ type: ERROR, err });
    },
  };
};
