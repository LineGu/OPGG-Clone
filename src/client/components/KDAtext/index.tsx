import { IChildrenComponentProps } from '@types';
import React from 'react';
import styled from 'styled-components';

interface KDAtextProps extends IChildrenComponentProps {
  kill: string;
  death: string;
  assist: string;
  assistColor?: string;
  killColor?: string;
  deathColor?: string;
  slashColor?: string;
}

const StyledKDABox = styled.p<{
  assistColor: string;
  killColor: string;
  deathColor: string;
  slashColor: string;
}>`
  font-size: 11px;
  font-family: Helvetica;
  font-weight: 800;
  color: ${({ slashColor }) => slashColor};
  margin: 0;
  .kill {
    color: ${({ killColor }) => killColor};
  }
  .assist {
    color: ${({ assistColor }) => assistColor};
  }
  .death {
    color: ${({ deathColor }) => deathColor};
  }
`;

function KDAtext({
  kill,
  death,
  assist,
  assistColor = '#333333',
  killColor = '#333333',
  deathColor = '#c6443e;',
  slashColor = '#999999',
  className,
}: KDAtextProps) {
  return (
    <StyledKDABox
      assistColor={assistColor}
      killColor={killColor}
      deathColor={deathColor}
      slashColor={slashColor}
      className={className}
    >
      <span className="kill">{kill}</span>
      {'\u00A0'}/
      <span className="death">
        {'\u00A0'}
        {death}
      </span>
      {'\u00A0'}/
      <span className="assist">
        {'\u00A0'}
        {assist}
      </span>
    </StyledKDABox>
  );
}

export default KDAtext;
