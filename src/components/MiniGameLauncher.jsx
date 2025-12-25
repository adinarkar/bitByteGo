import React from 'react';
import TileBreaker from './minigames/TileBreaker';
import MemoryFlip from './minigames/MemoryFlip';
import GuessNumber from './minigames/GuessNumber';
import MazeGame from './minigames/MazeGame';

export default function MiniGameLauncher({ type, onWin, difficulty }) {
  const games = {
    tileBreaker: <TileBreaker onWin={onWin} difficulty={difficulty} />,
    memoryFlip: <MemoryFlip onWin={onWin} difficulty={difficulty} />,
    guessNumber: <GuessNumber onWin={onWin} difficulty={difficulty} />,
    maze: <MazeGame onWin={onWin} difficulty={difficulty} />,
  };

  return (
    <div className="minigame-launcher">
      {games[type] || <div>No mini-game assigned</div>}
    </div>
  );
}
