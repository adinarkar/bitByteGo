import React, { useState } from 'react';
import './minigames.css';

export default function GuessNumber({ onWin, difficulty = 'easy' }) {
  // difficulty adjusts number length: easy:4 digits, medium:5, hard:6
  const len = difficulty === 'medium' ? 5 : difficulty === 'hard' ? 6 : 4;
  // generate a random target array of digits
  const randDigit = () => Math.floor(Math.random() * 10);
  const target = React.useMemo(() => Array.from({ length: len }).map(_ => randDigit()), [len]);
  const [guesses, setGuesses] = useState(Array(len).fill(''));

  const handleChange = (idx, value) => {
    if (value.length > 1) value = value[value.length-1];
    if (!/^\d?$/.test(value)) return;
    const copy = [...guesses];
    copy[idx] = value;
    setGuesses(copy);
    // immediate check: correct digits turn green
    if (copy.every((v, i) => String(target[i]) === String(v))) {
      setTimeout(() => onWin(), 200);
    }
  };

  return (
    <div className="guess-number">
      {guesses.map((g, i) => {
        const correct = String(g) === String(target[i]);
        return (
          <input
            key={i}
            type="text"
            inputMode="numeric"
            maxLength="1"
            value={g}
            onChange={(e) => handleChange(i, e.target.value)}
            className={`guess-input ${correct ? 'correct' : ''}`}
          />
        );
      })}
      <div style={{ fontSize: 12, opacity: 0.8, marginTop: 8 }}>Fill all digits correctly to unlock</div>
    </div>
  );
}
