import useSummonerData from '@hooks/useSummonerData';
import React from 'react';
import styled from 'styled-components';

interface IRankCardProps {
  type: 'solo' | 'free';
}

const StyledRankCard = styled.div<{ hasResults: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  width: 300px;
  height: ${({ hasResults }) => (hasResults ? 124 : 98)}px;
  padding: 8px 0px;
  border-radius: 2px;
  border: solid 1px #cdd2d2;
  background-color: #f2f2f2;
  font-family: Helvetica;
`;

const StyledTierImg = styled.img`
  width: 104px;
  height: 104px;
`;

const StyledTierInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 90px;
  font-size: 12px;
  line-height: 1.5;
  text-align: left;

  .rank-type {
    font-family: AppleSDGothicNeo;
    font-size: 11px;
    color: #879292;
  }

  .rank-tier {
    font-size: 15px;
    font-weight: 800;
    color: #1f8ecd;
  }

  .rank-win-rate-info {
    width: 76px;
    height: 18px;
    margin: 0 17px 6px 0;
  }

  .detail-win-lose-info {
    display: flex;
    color: #555e5e;
    white-space: nowrap;
    *:not(.rank-point) {
      font-size: 12px;
      color: #879292;
    }

    *:first-child {
      font-weight: 800;
    }
    *:nth-child(2) {
      margin-left: 2px;
    }
  }

  .win-rate {
    font-size: 12px;
    color: #879292;
  }

  .default-unrank {
    font-family: Helvetica;
    font-size: 13px;
    color: #879292;
    font-weight: 800;
  }

  .unrank-type {
    padding: 0;
    margin: 24px 0 0 0;
    font-size: 11px;
    font-weight: 400;
    color: #879292;
  }
`;

const DEFULT_TIER_IMG_URL = 'https://opgg-static.akamaized.net/images/medals/default.png';

function RankCard({ type }: IRankCardProps) {
  const { summonerData } = useSummonerData();
  const rankInfo =
    type === 'solo' ? summonerData.basicData.leagues[0] : summonerData.basicData.leagues[1];

  const createFullTier = (short: string, tier: string) => {
    return tier + ' ' + short.split('').pop();
  };

  const calWinRate = (win: number, loss: number) => {
    const total = win + loss;
    return Math.round((win / total) * 100);
  };

  const { hasResults } = rankInfo;

  return (
    <StyledRankCard hasResults={hasResults}>
      <StyledTierImg
        src={hasResults ? rankInfo.tierRank.imageUrl : DEFULT_TIER_IMG_URL}
        alt={hasResults ? rankInfo.tierRank.tier : '랭크 이미지'}
      />
      <StyledTierInfo>
        {hasResults ? (
          <>
            <div className="rank-type">{rankInfo.tierRank.name}</div>
            <div className="rank-tier">
              {createFullTier(rankInfo.tierRank.shortString, rankInfo.tierRank.tier)}
            </div>
            <div className="rank-win-rate-info">
              <section className="detail-win-lose-info">
                <span className="rank-point">{rankInfo.tierRank.tierRankPoint}LP</span>
                <span className="win-count">/ {rankInfo.wins}승</span>
                <span className="lose-count">
                  {'\u00A0'}
                  {rankInfo.losses}패
                </span>
              </section>
              <span className="win-rate">승률{calWinRate(rankInfo.wins, rankInfo.losses)}%</span>
            </div>
          </>
        ) : (
          <>
            <p className="unrank-type">{rankInfo.tierRank.name}</p>
            <span className="default-unrank">Unranked</span>
          </>
        )}
      </StyledTierInfo>
    </StyledRankCard>
  );
}

export default RankCard;
