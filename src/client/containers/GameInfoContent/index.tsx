import DetailGameDataItem from '@components/DetailGameDataItem';
import RecentGameInfo from '@components/RecentGameInfo';
import useInGameData from '@hooks/useInGameData';
import React from 'react';

interface IGameInfoContentProps {
  type: 'solo' | 'total' | 'free';
}

function GameInfoContent({ type }: IGameInfoContentProps) {
  const { inGameData, getRecentGames, reviseGameDatas } = useInGameData();
  const recentGamesData = getRecentGames(inGameData, 20, type);
  const recentGamesDataRevised = reviseGameDatas(recentGamesData);

  return (
    <div>
      <RecentGameInfo recentGamesData={recentGamesDataRevised} />
      {recentGamesData.map((gameData) => (
        <DetailGameDataItem gameData={gameData} key={gameData.gameData.gameId} />
      ))}
    </div>
  );
}

export default GameInfoContent;
