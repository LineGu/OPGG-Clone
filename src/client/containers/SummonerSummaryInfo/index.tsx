import React from 'react';
import styled from 'styled-components';
import PastTiers from '@components/PastTiers';
import useSummonerData from '@hooks/useSummonerData';
import ProfileIcon from '@components/ProfileIcon';
import LadderRank from '@components/LadderRank';

const SummonerSummaryInfoWrapper = styled.div`
  .past-tiers {
    padding: 0 0 0 2px;
    margin: 0 0 6px 30px;
  }

  .profile-img {
    display: inline-block;
    margin: 10px 0 0 30px;
    vertical-align: top;
  }
  .profile-text {
    position: relative;
    display: inline-block;
    font-family: AppleSDGothicNeo;
    font-size: 20px;
    font-weight: bold;
    font-style: normal;
    line-height: 1.4;
    letter-spacing: -0.77px;
    max-width: 80%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    height: 100px;
    margin: 9px 25px 0 28px;
    vertical-align: top;

    & > *:nth-child(2) {
      font-weight: normal;
      letter-spacing: -0.42px;
      color: #657070;
    }
  }
`;

const StyledSummonerName = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #242929;
`;

function SummonerSummaryInfo() {
  const { summonerData } = useSummonerData();

  return (
    <SummonerSummaryInfoWrapper>
      <PastTiers previousTiers={summonerData.basicData.previousTiers} className="past-tiers" />
      <ProfileIcon
        borderSrc={summonerData.basicData.profileBorderImageUrl}
        profileSrc={summonerData.basicData.profileImageUrl}
        level={summonerData.basicData.level}
        className="profile-img"
      />
      <div className="profile-text">
        <StyledSummonerName>{summonerData.basicData.name}</StyledSummonerName>
        <LadderRank
          ranking={summonerData.basicData.ladderRank.rank}
          rankingPercent={summonerData.basicData.ladderRank.rankPercentOfTop}
        />
      </div>
    </SummonerSummaryInfoWrapper>
  );
}

export default SummonerSummaryInfo;
