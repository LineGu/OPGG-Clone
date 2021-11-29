import Badge from '@components/commons/Badge';
import KDAtext from '@components/KDAtext';
import { IGeneral } from '@types';
import React from 'react';
import styled from 'styled-components';

interface ISummonerAchievProps {
  achievInfo: IGeneral;
}

const StyledKDAText = styled(KDAtext)`
  font-family: Helvetica;
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 6px;
`;

const SummonerAcheivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 113px;
  height: 100%;

  & > span {
    margin-bottom: 7px;
  }

  .kda-info {
    font-weight: 700;
    color: #333333;
    & > span {
      color: #555;
    }
  }

  .badge-wrapper {
    font-size: 11px;
    display: flex;
    justify-content: center;

    & > *:first-child {
      margin-right: 4px;
    }
  }
`;

const multiKillDict = {
  'Double Kill': '더블킬',
};

const translateMultiKillText = (text: string) => multiKillDict[text];

function InGameSummonerAchiev({ achievInfo }: ISummonerAchievProps) {
  const { kill, death, assist, kdaString, opScoreBadge, largestMultiKillString } = achievInfo;
  return (
    <SummonerAcheivWrapper>
      <StyledKDAText
        kill={String(kill)}
        death={String(death)}
        assist={String(assist)}
        killColor="#555e5e"
        assistColor="#555e5e"
      />
      <span className="kda-info">
        {kdaString} <span>평점</span>
      </span>
      <div className="badge-wrapper">
        {largestMultiKillString ? (
          <Badge
            content={translateMultiKillText(largestMultiKillString)}
            color="#ec4f48"
            borderColor="#bf3b36"
          />
        ) : null}
        {opScoreBadge ? (
          <Badge content={opScoreBadge} color="#8c51c5" borderColor="#7f3590" />
        ) : null}
      </div>
    </SummonerAcheivWrapper>
  );
}

export default InGameSummonerAchiev;
