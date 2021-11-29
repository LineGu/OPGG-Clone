import React from 'react';

import SearchHeader from '@layouts/SearchHeader';
import SummonerInfoHeader from '@layouts/SummonerInfoHeader';
import BodyLayout from '@layouts/BodyLayout';
import SummonerDataProvider from '@models/SummonerData/SummonerDataProvider';
import LanguageProvider from '@models/LanguageData/LanguageProvider';
import InGameDataProvider from '@models/InGameData/InGameDataProvider';
import { IInitData } from '@types';
import MainBody from '@layouts/MainBody';

interface IInitDataProps {
  initData: IInitData;
}

function IndexPage({ initData }: IInitDataProps) {
  return (
    <LanguageProvider>
      <SummonerDataProvider initData={initData}>
        <InGameDataProvider initData={initData}>
          <BodyLayout>
            <SearchHeader />
            <SummonerInfoHeader />
            <MainBody />
          </BodyLayout>
        </InGameDataProvider>
      </SummonerDataProvider>
    </LanguageProvider>
  );
}

export default IndexPage;
