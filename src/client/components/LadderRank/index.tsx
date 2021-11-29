import { IChildrenComponentProps } from 'src/types';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface ILadderRankProps extends IChildrenComponentProps {
  ranking: number;
  rankingPercent: number;
}

const StyledLadderRank = styled.div`
  color: #555e5e;
  font-size: 11px;
  text-decoration: none;
  line-height: 1.5;

  & > strong,
  & > span {
    font-family: Helvetica;
  }
`;

function LadderRank({ ranking, rankingPercent }: ILadderRankProps): ReactElement {
  return (
    <StyledLadderRank>
      래더 랭킹{'\u00A0'}
      <strong>{ranking}</strong>위 (상위 <span>{rankingPercent}</span>%)
    </StyledLadderRank>
  );
}

export default LadderRank;
