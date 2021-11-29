import React, { ReactElement } from 'react';
import styled from 'styled-components';

import SearchBar from '@containers/SearchBar';

const StyledHeader = styled.header`
  height: 97px;
  background-color: #1ea1f7;
`;

const StyledSearchBar = styled(SearchBar)`
  position: absolute;
  right: 0;
  bottom: 12px;
`;

const SearchHeader = (): ReactElement => {
  return (
    <StyledHeader>
      <div className="layout-fixer">
        <StyledSearchBar />
      </div>
    </StyledHeader>
  );
};

export default SearchHeader;
