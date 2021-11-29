import React from 'react';
import {
  SummonerDataContext,
  ISummonerDataProviderValue,
} from '@models/SummonerData/SummonerDataProvider';

function useSummonerData(): ISummonerDataProviderValue {
  return React.useContext(SummonerDataContext) as ISummonerDataProviderValue;
}

export default useSummonerData;
