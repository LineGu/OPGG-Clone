import ImageIcon from '@components/commons/ImageIcon';
import { IRecentGameData, IRecentGameDataPerChamp } from '@types';
import React from 'react';
import styled from 'styled-components';
import useResponsiveColor from '@hooks/useResponsiveColor';
import { KDA_COLOR_RULE, WIN_RATE_COLOR_RULE } from '@constants/colorRule';
import RecentChampWinRate from '@components/RecentChampWinRate';
import DonutChartElem from '@components/commons/DonutChart';
import KDAtext from '@components/KDAtext';

interface IRecentGameInfoProps {
  recentGamesData: IRecentGameData;
}

const RecentGameInfoWrapper = styled.div`
  display: flex;
  height: 158px;
  width: 100%;
  border: 1px solid #cdd2d2;
  box-shadow: 0 1px #dcdfdf;
  background: #f2f2f2;
  border-top: none;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  margin-bottom: 16px;

  .recent-total-win-rate-chart {
    display: flex;
    width: 50%;
    flex-direction: column;
    align-items: center;
  }

  .recent-win-rate-data {
    display: flex;
    width: 50%;
    height: 100%;
    border-right: 1px solid #cdd2d2;
    padding-left: 24px;

    .recent-win-loss-info {
      margin: 16px 0 14px 0;
      font-family: Helvetica;
      color: #666;
    }

    .text-info-container {
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      & > p:first-child {
        margin-bottom: 10px;
      }

      & > p:nth-child(2) {
        font-size: 16px;
        font-weight: 800;
        color: #5e5e5e;
        margin: 0;
      }
    }
  }

  .recent-win-rate-per-champ {
    width: 50%;
    height: 100%;
    padding: 16px;
  }

  .empty-champ {
    display: flex;
    align-items: center;

    span {
      margin-left: 8px;
      font-family: NanumBarunGothicOTF;
      font-size: 11px;
      color: #999;
    }
  }
`;

const getThreeTopChamp = (perChamp: IRecentGameDataPerChamp[]) => {
  perChamp.sort((prev, next) => {
    if (prev.cnt > next.cnt) return -1;
    return 1;
  });
  return perChamp.slice(0, 3);
};

function RecentGameInfo({ recentGamesData }: IRecentGameInfoProps) {
  const { win, loss, rate, kda, perChamp, kill, death, assist } = recentGamesData;
  const { targetEl: kdaEl } = useResponsiveColor(KDA_COLOR_RULE, kda);
  const { targetEl: winRateEl } = useResponsiveColor(WIN_RATE_COLOR_RULE, rate);

  const totalGame = win + loss;
  const averageKill = (kill / totalGame).toFixed(1);
  const averageDeath = (death / totalGame).toFixed(1);
  const averageAssist = (assist / totalGame).toFixed(1);
  const topThreeChamps = getThreeTopChamp(Object.values(perChamp));

  const chartData = [
    {
      label: 'win',
      value: rate,
      className: 'win-chart',
    },
    {
      label: 'loss',
      value: 100 - rate,
      className: 'loss-chart',
    },
  ];

  const chartColors = ['#1f8ecd', '#ee5a52'];

  return (
    <RecentGameInfoWrapper>
      <div className="recent-win-rate-data">
        <div className="recent-total-win-rate-chart">
          <p className="recent-win-loss-info">
            {totalGame}전 {win}승 {loss}패
          </p>
          <DonutChartElem data={chartData} colors={chartColors} />
        </div>
        <div className="text-info-container">
          <KDAtext kill={averageKill} death={averageDeath} assist={averageAssist} />
          <p className="recent-kda-rate-info">
            <span ref={kdaEl}>{kda.toFixed(2)}:1</span>
            <span ref={winRateEl}>
              {'\u00A0'}({rate.toFixed(0)}%)
            </span>
          </p>
        </div>
      </div>
      <div className="recent-win-rate-per-champ">
        {topThreeChamps.map((champData) => {
          return <RecentChampWinRate champData={champData} key={champData.name + champData.rate} />;
        })}
        {topThreeChamps.length < 3
          ? new Array(3 - topThreeChamps.length).fill(0).map(() => (
              <div className="empty-champ">
                <ImageIcon
                  src="https://i.ibb.co/1LGJVD6/empty-Champ.png"
                  size={34}
                  alt="빈 챔피언"
                  shape="rect"
                />
                <span>챔피언 정보가 없습니다.</span>
              </div>
            ))
          : null}
      </div>
    </RecentGameInfoWrapper>
  );
}

export default RecentGameInfo;
