import React, { useState } from 'react';
import './minigames.css';

export default function TileBreaker({ onWin, difficulty = 'easy' }) {
  // difficulty affects number of tiles (easy:6, medium:9, hard:12)
  const count = difficulty === 'medium' ? 9 : difficulty === 'hard' ? 12 : 6;
  const [tiles, setTiles] = useState(Array(count).fill(true));

  const breakTile = (i) => {
    if (!tiles[i]) return;
    const copy = [...tiles];
    copy[i] = false;
    setTiles(copy);
    if (copy.every(t => !t)) {
      setTimeout(onWin, 200);
    }
  };

  return (
    <div className="tilebreaker">
      {tiles.map((t, i) => (
        <div key={i} className={`tile ${t ? 'unbroken' : 'broken'}`} onClick={() => breakTile(i)}>
          {t ? '🧱' : '💥'}
        </div>
      ))}
    </div>
  );
}
