import ImageIcon from '@components/commons/ImageIcon';
import { KDA_COLOR_RULE, WIN_RATE_COLOR_RULE } from '@constants/colorRule';
import useResponsiveColor from '@hooks/useResponsiveColor';
import { IMostChampion } from '@types';
import React from 'react';
import styled from 'styled-components';

interface IDetailChampWinInfoProps {
  winData: IMostChampion;
}

const StyledChampWinInfo = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #cdd2d2;
  color: #879292;
  padding: 5px 15px;
  margin: 0;
  text-align: initial;

  .column-wrapper {
    display: flex;
    flex-direction: column;
    font-family: Helvetica;
    font-size: 11px;
    color: #879292;
    line-height: 1.4;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    & > span:first-child {
      font-family: AppleSDGothicNeo;
      font-size: 13px;
      font-weight: 800;
      color: #5e5e5e;
    }
  }
  .kda-info-wrapper {
    width: 90px;
    text-align: center;
  }

  .win-rate-container {
    width: 40px;
    margin-left: 21px;
    text-align: center;
  }

  .champ-info-container {
    width: 60px;
    margin-left: 10px;
    text-align: initial;
  }
`;

function DetailChampWinInfo({ winData }: IDetailChampWinInfoProps) {
  const kda = ((winData.kills + winData.assists) / winData.deaths).toFixed(2);
  const totalGameCnt = winData.games;
  const winRate = (winData.wins * 100) / totalGameCnt;

  const { targetEl: kdaTarget } = useResponsiveColor(KDA_COLOR_RULE, parseInt(kda));
  const { targetEl: winRateTarget } = useResponsiveColor(WIN_RATE_COLOR_RULE, winRate);

  return (
    <StyledChampWinInfo>
      <ImageIcon src={winData.imageUrl} alt={winData.name} shape="circle" size={45} />
      <div className="champ-info-container column-wrapper">
        <span className="champ-name">{winData.name}</span>
        <span className="cs-per-champ">CS {winData.cs}</span>
      </div>
      <div className="kda-info-wrapper column-wrapper">
        <span className="kda-score-per-champ" ref={kdaTarget}>
          {kda}:1 평점
        </span>
        <div className="avarage-info-container">
          <span className="avarage-kill">{(winData.kills / totalGameCnt).toFixed(1)} / </span>
          <span className="avarage-death">{(winData.deaths / totalGameCnt).toFixed(1)} / </span>
          <span className="avarage-assist">{(winData.assists / totalGameCnt).toFixed(1)}</span>
        </div>
      </div>
      <div className="win-rate-container column-wrapper">
        <span className="champ-win-rate" ref={winRateTarget}>
          {winRate.toFixed(0)}%
        </span>
        <span className="champ-total-game-cnt">{totalGameCnt}게임</span>
      </div>
    </StyledChampWinInfo>
  );
}

export default DetailChampWinInfo;
