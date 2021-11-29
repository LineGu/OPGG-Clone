import { IInitData } from '@types';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import IndexPage from './page/Main';

interface AppProps {
  initData: IInitData;
}

function App({ initData }: AppProps) {
  return (
    <Routes>
      <Route path="/:summonerName" element={<IndexPage initData={initData} />} />
    </Routes>
  );
}

export default App;
