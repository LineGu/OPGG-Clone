import { IChildrenComponentProps } from 'src/types';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface ITierTagProps extends IChildrenComponentProps {
  season: number;
  tier: string;
}

const StyledTierTag = styled.li`
  display: inline-block;
  padding: 3px 4px 2px 4px;
  background-color: #e0e3e3;
  color: #657070;
  font-size: 11px;
  border: 1px solid #d0d3d4;
  border-radius: 2px;
  font-family: Helvetica;
  letter-spacing: -0.42px;
`;

function TierTag({ season, tier, className }: ITierTagProps): ReactElement {
  return (
    <StyledTierTag className={className}>
      <strong>S{season}</strong>
      {'\u00A0'}
      {tier}
    </StyledTierTag>
  );
}

export default TierTag;
