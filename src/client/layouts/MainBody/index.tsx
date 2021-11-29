import React from 'react';
import SideBox from '@layouts/SideBox';
import styled from 'styled-components';
import GameInfoContainer from '@containers/GameInfoContainer';

const MainContentFixer = styled.div`
  .layout-fixer {
    display: flex;
    padding-top: 10px;
  }
`;

function MainBody() {
  return (
    <MainContentFixer>
      <div className="layout-fixer">
        <SideBox />
        <GameInfoContainer />
      </div>
    </MainContentFixer>
  );
}

export default MainBody;
