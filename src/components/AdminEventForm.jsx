import React, { useState } from 'react';
import './AdminEventForm.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export default function AdminEventForm() {
  const [form, setForm] = useState({
    eventName: '',
    eventDate: '',
    eventVenue: '',
    eventTime: '',
    description: '',
    image: '',
    miniGameType: 'tileBreaker',
    difficulty: 'easy',
    rules: ''
  });

  const change = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/events/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        alert('Event created!');
        setForm({
          eventName: '',
          eventDate: '',
          eventVenue: '',
          eventTime: '',
          description: '',
          image: '',
          miniGameType: 'tileBreaker',
          difficulty: 'easy',
          rules: ''
        });
      } else {
        alert('Could not create event');
      }
    } catch (err) {
      console.error(err);
      alert('Error creating event');
    }
  };

  return (
    <form className="admin-form" onSubmit={submit}>
      <h3>Create Event (Admin)</h3>
      <input name="eventName" placeholder="Event name" value={form.eventName} onChange={change} required />
      <input name="eventDate" type="date" value={form.eventDate} onChange={change} required />
      <input name="eventVenue" placeholder="Venue" value={form.eventVenue} onChange={change} required />
      <input name="eventTime" placeholder="Time (e.g. 5:00 PM)" value={form.eventTime} onChange={change} required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={change} required />
      <input name="image" placeholder="Image URL (optional)" value={form.image} onChange={change} />

      <label>Mini-game</label>
      <select name="miniGameType" value={form.miniGameType} onChange={change}>
        <option value="tileBreaker">Tile Breaker</option>
        <option value="memoryFlip">Memory Flip</option>
        <option value="guessNumber">Guess the Number</option>
        <option value="maze">Maze</option>
      </select>

      <label>Difficulty</label>
      <select name="difficulty" value={form.difficulty} onChange={change}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <textarea name="rules" placeholder="Rules shown to users (optional)" value={form.rules} onChange={change} />
      <button type="submit">Create Event</button>
    </form>
  );
}
