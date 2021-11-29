import React from 'react';
import styled from 'styled-components';

interface StatInfoProps {
  level: number;
  cs: number;
  csPerMin: number;
  contributionKill: string;
}

const StatInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: AppleSDGothicNeo;
  font-size: 11px;
  padding-top: 13px;
  width: 90px;
  height: 100%;

  .level,
  .cs-cnt {
    letter-spacing: -0.42px;
    color: #555e5e;
    margin-bottom: 6px;
  }

  .contribution-kill {
    letter-spacing: -0.42px;
    color: #d0021b;
  }
`;

function InGameStatInfo({ level, cs, csPerMin, contributionKill }: StatInfoProps) {
  return (
    <StatInfoWrapper>
      <span className="level">레벨 {level}</span>
      <span className="cs-cnt">
        {cs} ({csPerMin}) CS
      </span>
      <span className="contribution-kill">킬관여 {contributionKill}</span>
    </StatInfoWrapper>
  );
}

export default InGameStatInfo;
