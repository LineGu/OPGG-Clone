import React from 'react';
import styled from 'styled-components';
import { getTimeDiff, getGameLength } from '../../utils';

const GameSummaryStatInfoWrapper = styled.div<{ isWin: boolean }>`
  font-family: AppleSDGothicNeo;
  font-size: 11px;
  letter-spacing: -0.42px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 71px;
  color: #555;

  .game-type {
    font-weight: 600;
    margin: 13px 0 4px 0;
  }

  .game-date {
    margin-bottom: 3px;
  }

  .game-win-info {
    font-weight: 600;
    color: ${({ isWin }) => (isWin ? '#2c709b' : '#d0021b')};
    margin-bottom: 4px;
  }

  & > hr {
    width: 27px;
    height: 1px;
    background-color: ${({ isWin }) => (isWin ? '#94b9d6' : '#d0a6a5')};
    border: none;
    margin: 0 0 5px 0;
  }
`;

function GameSummaryStatInfo({ gameType, date, isWin, gameLength }) {
  return (
    <GameSummaryStatInfoWrapper isWin={isWin}>
      <span className="game-type">{gameType}</span>
      <span className="game-date">{getTimeDiff(new Date(date * 1000)).join('')}전</span>
      <hr />
      <span className="game-win-info">{isWin ? '승리' : '패배'}</span>
      <span className="game-length">{getGameLength(gameLength)?.join(' ')}</span>
    </GameSummaryStatInfoWrapper>
  );
}

export default GameSummaryStatInfo;
