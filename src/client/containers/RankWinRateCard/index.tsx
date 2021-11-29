import Tab from '@components/commons/Tab';
import DetailChampWinInfo from '@components/DetailChampWinInfo';
import RecentRankWinRate from '@components/RecentRankWinRate';
import useSummonerData from '@hooks/useSummonerData';
import React from 'react';
import styled from 'styled-components';

const StyledWinRateCard = styled.div`
  width: 300px;
  border: 1px solid #cdd2d2;
  box-shadow: 0 1px #dcdfdf;
  background: #f2f2f2;
  border-radius: 2px;
  padding: 0;
  margin: 8px 0 0 0;

  .tab {
    display: flex;
    position: relative;
    width: 100%;
    table-layout: fixed;
    font-size: 12px;

    .unChecked {
      border: solid 1px #cdd2d2;
      border-top: none;
      background-color: #f2f2f2;
      color: #879292;
    }

    .checked {
      background-color: #ededed;
      font-weight: 800;
      color: #5e5e5e;
    }

    & span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50%;
      height: 44px;
    }

    & > span:last-child {
      border-right: none;
    }

    & > span:first-child {
      border-left: none;
    }
  }
`;

function RankWinRateCard() {
  const { summonerData } = useSummonerData();

  const tabMap = {
    recent: {
      name: '프리시즌',
      content: (
        <>
          {summonerData.winRateData.champions.map((winData, idx) => (
            <DetailChampWinInfo winData={winData} key={winData.name + winData.rank + idx} />
          ))}
        </>
      ),
    },
    free: {
      name: '7일간 랭크 승률',
      content: (
        <>
          {summonerData.winRateData.recentWinRate.map((recentData, idx) => (
            <RecentRankWinRate
              recentWinRate={recentData}
              key={recentData.id + recentData.name + idx}
            />
          ))}
        </>
      ),
    },
  };

  return (
    <StyledWinRateCard>
      <Tab tabMap={tabMap} />
    </StyledWinRateCard>
  );
}

export default RankWinRateCard;
