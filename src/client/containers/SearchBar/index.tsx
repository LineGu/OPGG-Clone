import React from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { IChildrenComponentProps, ISummonerDTO } from 'src/types';
import useSummonerData from '@hooks/useSummonerData';
import SummonerDropDownItem from '@components/SummonerDropDownItem';
import PreSummonerList from '@components/PreSummonerList';

const StyledSearchBar = styled.form`
  position: relative;
  display: inline-block;
  width: fit-content;
  background-color: #fff;
  border-radius: 2px;
`;

const StyledSearchInput = styled.input`
  width: 260px;
  height: 32px;
  border: none;
  padding: 9px 42px 8px 14px;
  line-height: 15px;
  outline: none;
  box-sizing: border-box;
  color: #727272;
  border-radius: 2px;
  &::placeholder {
    font-size: 12px;
  }
`;

const StyledSearchButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  height: 32px;
  width: 54px;
  text-align: center;
  border: none;
  background: none;

  & > img {
    width: 31px;
    height: 14px;

    &:hover {
      cursor: pointer;
    }
  }
`;

let debounceTimer;

function SearchBar({ className }: IChildrenComponentProps) {
  const { summonerName: defaultSummonerName } = useParams();
  const navigate = useNavigate();
  const { getSummaryInfo, preSummoners } = useSummonerData();
  const [summonerName, setSummonerName] = React.useState(defaultSummonerName);
  const [tempSearchData, setTempData] = React.useState<ISummonerDTO | null>(null);
  const [focusState, setFocusState] = React.useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentText = e.currentTarget.value;
    setSummonerName(currentText);
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      const data = await getSummaryInfo(currentText);
      setTempData(data);
    }, 200);
  };

  const search = (name = summonerName) => {
    if (name) navigate(`/${name}`);
  };

  const resetSearchText = () => {
    setSummonerName('');
    setFocusState(true);
  };

  const onBlur = (e) => {
    setTempData(null);
    setFocusState(false);
  };

  return (
    <StyledSearchBar
      className={className}
      onSubmit={(e) => e.preventDefault()}
      onFocus={resetSearchText}
      onBlur={onBlur}
    >
      <StyledSearchInput
        placeholder="소환사명,챔피언…"
        value={summonerName}
        onChange={onChange}
        autoComplete="false"
        spellCheck="false"
      />
      <StyledSearchButton onClick={() => search()}>
        <img
          src="https://opgg-static.akamaized.net/images/gnb/svg/00-icon-gg.svg"
          alt="검색 버튼"
        />
      </StyledSearchButton>
      {focusState && summonerName && tempSearchData ? (
        <SummonerDropDownItem summonerData={tempSearchData} />
      ) : null}
      {focusState && preSummoners.length && !summonerName ? (
        <PreSummonerList summonerList={preSummoners} search={search} />
      ) : null}
    </StyledSearchBar>
  );
}

export default SearchBar;
