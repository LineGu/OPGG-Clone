import { IInGameData, IInitData, ISummonerDTO, IWinRateData } from '@types';
import { reviver } from '@utils/index';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

declare global {
  interface Window {
    __INITIAL_DATA__: {
      inGameData: string | Map<string, IInGameData>;
      summonerData: ISummonerDTO;
      winRateData: IWinRateData;
    };
  }
}

const reviseInitData = () => {
  const initialData = window.__INITIAL_DATA__;
  initialData.inGameData = JSON.parse(initialData.inGameData as string, reviver) as Map<
    string,
    IInGameData
  >;
  return initialData;
};

const initialData = reviseInitData();
const rootElement = document.getElementById('root');

ReactDOM.hydrate(
  <BrowserRouter>
    <App initData={initialData as IInitData} />
  </BrowserRouter>,
  rootElement
);
