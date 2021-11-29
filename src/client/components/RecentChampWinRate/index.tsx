import ImageIcon from '@components/commons/ImageIcon';
import { KDA_COLOR_RULE, WIN_RATE_COLOR_RULE } from '@constants/colorRule';
import useResponsiveColor from '@hooks/useResponsiveColor';
import { IRecentGameDataPerChamp } from '@types';
import React from 'react';
import styled from 'styled-components';
import { dictionary } from '../../../common/api/summoner';

interface IRecentChampWinRateProps {
  champData: IRecentGameDataPerChamp;
}

const RecentChampWinDataWrapper = styled.div`
  display: flex;
  padding-bottom: 12px;

  img {
    margin-right: 8px;
  }
  .champ-text-info {
    display: flex;
    flex-direction: column;
    font-size: 11px;

    p {
      margin: 0 0 3px 0;
      font-family: NanumBarunGothicOTF;
      font-size: 14px;
      color: #333;
    }

    .win-rate-data-wrapper {
      display: flex;
      .champ-win-rate {
        width: 32px;
        font-weight: 800;
      }

      .champ-win-loss-info {
        width: 50px;
        color: #555;
        border-right: 1px solid #cdd2d2;
      }

      .champ-kda-info {
        width: 80px;
        padding-left: 5px;
        font-weight: 800;
      }
    }
  }
`;

function RecentChampWinRate({ champData }: IRecentChampWinRateProps) {
  const { targetEl: champKdaEl } = useResponsiveColor(KDA_COLOR_RULE, champData.kda);
  const { targetEl: champWinRateEl } = useResponsiveColor(WIN_RATE_COLOR_RULE, champData.rate);

  return (
    <RecentChampWinDataWrapper>
      <ImageIcon src={champData.img} shape="circle" alt={champData.name} size={34} />
      <div className="champ-text-info">
        <p>{dictionary.get(champData.name.toLowerCase()) ?? champData.name}</p>
        <div className="win-rate-data-wrapper">
          <span className="champ-win-rate" ref={champWinRateEl}>
            {champData.rate.toFixed(0)}%{'\u00A0'}
          </span>
          <span className="champ-win-loss-info">
            ({champData.win}승 {champData.loss}패){'\u00A0'}
          </span>
          <span className="champ-kda-info" ref={champKdaEl}>
            {'\u00A0'}
            {champData.kda.toFixed(2)} 평점
          </span>
        </div>
      </div>
    </RecentChampWinDataWrapper>
  );
}

export default RecentChampWinRate;
