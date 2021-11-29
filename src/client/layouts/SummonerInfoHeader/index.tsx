import React, { ReactElement } from 'react';
import styled from 'styled-components';
import SummonerSummaryInfo from '@containers/SummonerSummaryInfo';

const StyledHeader = styled.header`
  width: 100%;
  height: 175px;
  border-bottom: 1px solid #d8d8d8;

  .layout-fixer {
    padding: 15px 0 0 0;
  }
`;

const SummonerInfoHeader = (): ReactElement => {
  return (
    <StyledHeader>
      <div className="layout-fixer">
        <SummonerSummaryInfo />
      </div>
    </StyledHeader>
  );
};

export default SummonerInfoHeader;
