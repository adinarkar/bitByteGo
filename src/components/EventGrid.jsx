import React, { useEffect, useState } from 'react';
import SpotlightCard from './SpotlightCard/SpotlightCard';
import MiniGameLauncher from './MiniGameLauncher';
import EventDetails from './EventDetails';
import './EventGrid.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001';

export default function EventGrid() {
  const [events, setEvents] = useState([]);
  const [unlockedIds, setUnlockedIds] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const res = await fetch(`${API_BASE}/api/events`);
      const data = await res.json();
      setEvents(data);

      // Find unlocked events
      const unlocked = data
        .filter(e => !e.locked || (e.miniGame && e.miniGame.unlocked))
        .map(e => e._id);

      setUnlockedIds(unlocked);
    } catch (err) {
      console.error('Fetch events error', err);
    }
  }

  const handleWin = async (eventId) => {
    // optimistic UI update
    setUnlockedIds(prev => [...new Set([...prev, eventId])]);

    try {
      await fetch(`${API_BASE}/api/events/${eventId}/unlock`, { method: 'POST' });
      // refresh events to keep DB and UI in sync
      fetchEvents();
    } catch (err) {
      console.error('Error unlocking on backend', err);
    }
  };

  return (
    <div className="event-grid">
      {events.map(e => (
        <SpotlightCard key={e._id} className="event-card">
          {unlockedIds.includes(e._id) ? (
            <EventDetails event={e} />
          ) : (
            <div className="locked-wrapper">
              <h3>🔒 Locked</h3>
              <p className="rules">
                {e.miniGame?.rules || 'Complete the mini-game to reveal event details.'}
              </p>
              <MiniGameLauncher
                type={e.miniGame?.type}
                difficulty={e.miniGame?.difficulty}
                onWin={() => handleWin(e._id)}
              />
            </div>
          )}
        </SpotlightCard>
      ))}
    </div>
  );
}
