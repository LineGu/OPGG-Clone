import ImageIcon from '@components/commons/ImageIcon';
import { WIN_RATE_COLOR_RULE } from '@constants/colorRule';
import useResponsiveColor from '@hooks/useResponsiveColor';
import { IChampionWinRate } from '@types';
import React from 'react';
import styled from 'styled-components';

interface IRecentRankWinRateProps {
  recentWinRate: IChampionWinRate;
}

const StyledRecentWinRateWraaper = styled.div<{ winRate: string }>`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #cdd2d2;
  color: #879292;
  padding: 5px 15px;
  margin: 0;
  text-align: initial;
  font-size: 13px;

  .champ-name {
    width: 70px;
    font-family: AppleSDGothicNeo;
    font-weight: 800;
    color: #5e5e5e;
    margin-left: 10px;
    text-align: initial;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .win-rate {
    font-family: Helvetica;
    color: #879292;
    width: 40px;
    margin-left: 11px;
    text-align: center;
    font-weight: 800;
  }

  .win-rate-bar {
    display: flex;
    width: 143px;
    height: 24px;
    color: #fff;
    margin-left: 12px;
    font-size: 12px;

    span {
      position: absolute;
      margin-top: 1px;
    }

    .win-bar {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
      background-color: #1f8ecd;
      width: ${({ winRate }) => winRate}%;
      padding-left: 4px;
    }
    .loss-bar {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      border-bottom-right-radius: 4px;
      border-top-right-radius: 4px;
      background-color: #c6443e;
      width: ${({ winRate }) => 100 - Number(winRate)}%;
      padding-right: 4px;
    }
  }
`;

function RecentRankWinRate({ recentWinRate }: IRecentRankWinRateProps) {
  const { name, imageUrl, wins, losses } = recentWinRate;
  const winRate = ((wins * 100) / (wins + losses)).toFixed(0);
  const { targetEl } = useResponsiveColor(WIN_RATE_COLOR_RULE, parseInt(winRate));

  return (
    <StyledRecentWinRateWraaper winRate={winRate}>
      <ImageIcon src={imageUrl} alt={name} shape="circle" size={32} />
      <span className="champ-name">{name}</span>
      <span className="win-rate" ref={targetEl}>
        {winRate}%
      </span>
      <div className="win-rate-bar">
        <div className="win-bar">
          <span>{wins}승</span>
        </div>
        <div className="loss-bar">
          <span>{losses}패</span>
        </div>
      </div>
    </StyledRecentWinRateWraaper>
  );
}

export default RecentRankWinRate;
