import React, { useEffect, useState } from 'react';
import './minigames.css';

export default function MazeGame({ onWin, difficulty = 'easy' }) {
  const size = difficulty === 'medium' ? 6 : difficulty === 'hard' ? 7 : 5;
  const goal = [size - 1, size - 1];
  const [player, setPlayer] = useState([0, 0]);

  useEffect(() => {
    if (player[0] === goal[0] && player[1] === goal[1]) {
      setTimeout(onWin, 200);
    }
  }, [player]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowUp') move(-1, 0);
      if (e.key === 'ArrowDown') move(1, 0);
      if (e.key === 'ArrowLeft') move(0, -1);
      if (e.key === 'ArrowRight') move(0, 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [player]);

  const move = (dx, dy) => {
    setPlayer(([x, y]) => {
      const nx = Math.max(0, Math.min(size - 1, x + dx));
      const ny = Math.max(0, Math.min(size - 1, y + dy));
      return [nx, ny];
    });
  };

  return (
    <div className="maze">
      {Array.from({ length: size }).map((_, r) => (
        <div key={r} className="maze-row">
          {Array.from({ length: size }).map((_, c) => {
            const isPlayer = player[0] === r && player[1] === c;
            const isGoal = goal[0] === r && goal[1] === c;
            return (
              <div key={c} className={`maze-cell ${isPlayer ? 'player' : ''} ${isGoal ? 'goal' : ''}`}>
                {isPlayer ? '🙂' : isGoal ? '🏁' : ''}
              </div>
            );
          })}
        </div>
      ))}
      <div style={{ fontSize: 12, marginTop: 8 }}>Use arrow keys to reach the goal</div>
    </div>
  );
}
