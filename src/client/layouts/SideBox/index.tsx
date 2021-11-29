import RankCard from '@containers/RankCard';
import RankWinRateCard from '@containers/RankWinRateCard';
import React from 'react';
import styled from 'styled-components';

const StyledSideBox = styled.div`
  display: inline-block;
  width: 300 px;
  font-size: 12px;
  vertical-align: top;

  & > *:nth-child(2) {
    margin-top: 8px;
  }
`;

function SideBox() {
  return (
    <StyledSideBox>
      <RankCard type="solo" />
      <RankCard type="free" />
      <RankWinRateCard />
    </StyledSideBox>
  );
}

export default SideBox;
