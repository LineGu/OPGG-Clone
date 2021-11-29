import { ISummonerDTO } from '@types';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface ISummonerDropDownItemProps {
  summonerData: ISummonerDTO;
}

const StyledDropDownItem = styled.div`
  display: flex;
  position: absolute;
  top: 35px;
  width: 85%;
  padding: 7px 17px;
  overflow: hidden;
  background-color: #fff;
  z-index: 10;

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }

  .summoner-temp-info {
    display: flex;
    flex-direction: column;
    margin: 2px 0 0 14px;
  }

  .dropdown-summonerName {
    font-family: sans-serif;
    font-size: 14px;
    line-height: 17px;
    color: #d53f3f;
  }

  & span:nth-child(2) {
    line-height: 14px;
    font-size: 12px;
  }

  p {
    margin: 0px;
    color: #666;
    font-size: 12px;
    font-weight: normal;
  }
`;

const createFullTier = (short: string, tier: string) => {
  return tier + ' ' + short.split('').pop();
};

function SummonerDropDownItem({ summonerData }: ISummonerDropDownItemProps): ReactElement {
  const [solo, free] = summonerData.summoner.leagues;
  let tierInfoBase = solo.hasResults ? solo : free;

  return (
    <StyledDropDownItem>
      <img src={summonerData.summoner.profileImageUrl} alt="프로필 이미지" />
      <div className="summoner-temp-info">
        <span className="dropdown-summonerName">{summonerData.summoner.name}</span>
        {tierInfoBase.hasResults ? (
          <p>
            <span>
              {createFullTier(tierInfoBase.tierRank.shortString, tierInfoBase.tierRank.tier)}
            </span>{' '}
            - <span>{tierInfoBase.tierRank.lp}LP</span>
          </p>
        ) : (
          '랭크 정보가 없습니다.'
        )}
      </div>
    </StyledDropDownItem>
  );
}

export default SummonerDropDownItem;
