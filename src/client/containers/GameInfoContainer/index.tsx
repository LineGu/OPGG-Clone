import Tab from '@components/commons/Tab';
import GameInfoContent from '@containers/GameInfoContent';
import React from 'react';
import styled from 'styled-components';

const GameInfoWrapper = styled.div`
  width: 100%;
  margin: 0 0 0 10px;
  font-size: 12px;
  vertical-align: top;

  .tab {
    display: flex;
    position: relative;
    justify-content: flex-start;
    width: 100%;
    height: 36px;
    align-items: center;
    font-size: 12px;
    color: #555555;
    border: solid 1px #cdd2d2;
    font-family: NanumBarunGothicOTF;

    .checked {
      font-weight: 700;
      color: #1f8ecd;
      border-bottom: 2px solid #1f8ecd;
    }

    & span {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 8px 0 16px;
      height: 100%;
    }
  }
`;

function GameInfoContainer() {
  const tabMap = {
    total: {
      name: '전체',
      content: <GameInfoContent type="total" />,
    },
    solo: {
      name: '솔로게임',
      content: <GameInfoContent type="solo" />,
    },
    free: {
      name: '자유랭크',
      content: <GameInfoContent type="free" />,
    },
  };
  return (
    <GameInfoWrapper>
      <Tab tabMap={tabMap} />
    </GameInfoWrapper>
  );
}

export default GameInfoContainer;
