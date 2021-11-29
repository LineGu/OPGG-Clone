import GameSettingInfo from '@components/GameSettingInfo';
import GameSummaryStatInfo from '@components/GameSummaryStatInfo';
import InGameItemList from '@components/InGameItemList';
import InGameStatInfo from '@components/InGameStatInfo';
import InGameSummonerAchiev from '@components/InGameSummonerAchiev';
import ParticipantItem from '@components/ParticipantItem';
import WardInfo from '@components/WardInfo';
import { IInGameData } from '@types';
import React from 'react';
import styled from 'styled-components';

interface IDetailGameDataItemProps {
  gameData: IInGameData;
}

const GameInfoItemWrapper = styled.div<{ gameResult: string }>`
  position: relative;
  display: flex;
  margin-bottom: 8px;
  width: 100%;
  height: 96px;
  margin-bottom: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: ${({ gameResult }) => {
    switch (gameResult) {
      case 'win':
        return '#b0ceea';

      case 'loss':
        return '#d6b5b2';

      default:
        return '#b6b6b6';
    }
  }};

  border: 1px solid
    ${({ gameResult }) => {
      switch (gameResult) {
        case 'win':
          return '#a1b8cd';

        case 'loss':
          return '#c0aba8';

        default:
          return '#a7a7a7';
      }
    }};

  .in-game-item-unit {
    background-color: ${({ gameResult }) => {
      switch (gameResult) {
        case 'win':
          return '#7aa5c3';

        case 'loss':
          return '#cb9e9a';

        default:
          return '#979797';
      }
    }};
  }

  .in-game-sub-info {
    display: flex;
    width: 113px;
    height: 100%;
    flex-direction: column;
    justify-content: center;

    & > *:first-child {
      margin-bottom: 7px;
    }
  }

  .players {
    position: absolute;
    top: 0;
    right: 30px;
    display: flex;
    width: 170px;
    padding-top: 4px;
    .team {
      display: flex;
      flex-direction: column;
      width: 50%;
    }

    .team:first-child {
      margin-right: 19px;
    }
  }
`;

const getGameResult = (needRenew: boolean, isWin: boolean) => {
  if (needRenew) return 'renew';
  if (isWin) return 'win';
  return 'loss';
};

function DetailGameDataItem({ gameData }: IDetailGameDataItemProps) {
  const { participantInfo } = gameData;
  const {
    needRenew,
    isWin,
    summonerName,
    champion,
    stats,
    spells,
    peak,
    gameType,
    gameLength,
    createDate,
  } = gameData.gameData;
  const generalInfo = stats.general;

  return (
    <GameInfoItemWrapper gameResult={getGameResult(needRenew, isWin)}>
      <GameSummaryStatInfo
        gameType={gameType}
        gameLength={gameLength}
        date={createDate}
        isWin={isWin}
      />
      <GameSettingInfo champion={champion} spells={spells} runes={peak} />
      <InGameSummonerAchiev achievInfo={gameData.gameData.stats.general} />
      <InGameStatInfo
        level={champion.level}
        cs={generalInfo.cs}
        csPerMin={generalInfo.csPerMin}
        contributionKill={generalInfo.contributionForKillRate}
      />
      <div className="in-game-sub-info">
        <InGameItemList items={gameData.gameData.items} />
        <WardInfo wardInfo={gameData.gameData.stats.ward} isWin={isWin} />
      </div>
      <div className="players">
        {participantInfo.teams.map((team) => (
          <div className="team" key={team.teamId}>
            {team.players.map((player) => (
              <ParticipantItem
                imgSrc={player.champion.imageUrl}
                summoner={player.summonerName}
                emphasis={player.summonerName === summonerName}
                key={player.summonerId}
              />
            ))}
          </div>
        ))}
      </div>
    </GameInfoItemWrapper>
  );
}

export default DetailGameDataItem;
