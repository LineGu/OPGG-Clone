import React from 'react';
import { IInGameDataProviderValue, InGameDataContext } from '@models/InGameData/InGameDataProvider';

function useInGameData(): IInGameDataProviderValue {
  return React.useContext(InGameDataContext) as IInGameDataProviderValue;
}

export default useInGameData;
