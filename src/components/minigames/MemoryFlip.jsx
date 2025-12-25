import React, { useEffect, useState } from 'react';
import './minigames.css';

function shuffle(arr) {
  return arr.map(a => [Math.random(), a]).sort((a,b)=>a[0]-b[0]).map(a=>a[1]);
}

export default function MemoryFlip({ onWin, difficulty = 'easy' }) {
  // easy: 3 pairs (6), medium:4 pairs (8), hard:6 pairs (12)
  const pairs = difficulty === 'medium' ? 4 : difficulty === 'hard' ? 6 : 3;
  const icons = ['🍎','🍊','🍇','🍋','🍓','🍑','🍌','🍍','🥝','🍒','🥥','🍐'];
  const chosen = icons.slice(0, pairs);
  const deckInit = shuffle([...chosen, ...chosen]);

  const [deck] = useState(deckInit);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    if (matched.length === deck.length) {
      setTimeout(onWin, 300);
    }
  }, [matched]);

  const handleClick = (i) => {
    if (flipped.includes(i) || matched.includes(i)) return;
    const newFlipped = [...flipped, i];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      const [a,b] = newFlipped;
      if (deck[a] === deck[b]) {
        setMatched(prev => [...prev, a, b]);
      }
      setTimeout(() => setFlipped([]), 700);
    }
  };

  return (
    <div className="memory-grid">
      {deck.map((icon, i) => (
        <div key={i} className={`memory-card ${flipped.includes(i)||matched.includes(i) ? 'flipped' : ''}`} onClick={() => handleClick(i)}>
          {flipped.includes(i) || matched.includes(i) ? icon : '❓'}
        </div>
      ))}
    </div>
  );
}
