import React from 'react';
import styled from 'styled-components';

interface IPreSummonerListProps {
  summonerList: string[];
  search: (name: string) => void;
}

const StyledDropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 35px;
  width: 85%;
  padding: 7px 17px;
  background-color: #fff;
  z-index: 10;

  .recent-search-title {
    text-align: center;
    margin: 5px 0;
    color: #4a4a4a;
  }
`;

const SummonerItem = styled.button`
  outline: none;
  border: none;
  background-color: inherit;
  display: inherit;
  position: relative;
  float: left;
  width: 100%;
  margin-top: 5px;
  padding: 4px 0;
  box-sizing: border-box;
  line-height: 15px;
  font-size: 12px;
  color: #666;
  z-index: 1;

  &:hover {
    cursor: pointer;
  }
`;

function PreSummonerList({ summonerList, search }: IPreSummonerListProps) {
  return (
    <StyledDropDownContainer>
      <span className="recent-search-title">최근 검색</span>
      {summonerList.map((summoner) => {
        return (
          <SummonerItem key={summoner} onMouseDown={(e) => search(summoner)}>
            <span>{summoner}</span>
          </SummonerItem>
        );
      })}
    </StyledDropDownContainer>
  );
}

export default PreSummonerList;
