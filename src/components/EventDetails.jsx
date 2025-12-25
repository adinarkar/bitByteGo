import React from 'react';

export default function EventDetails({ event }) {
  return (
    <div className="event-details">
      <h2 style={{ margin: '0 0 8px 0' }}>{event.eventName}</h2>
      <p style={{ margin: '4px 0' }}><strong>Date:</strong> {event.eventDate}</p>
      <p style={{ margin: '4px 0' }}><strong>Time:</strong> {event.eventTime}</p>
      <p style={{ margin: '4px 0' }}><strong>Venue:</strong> {event.eventVenue}</p>
      <p style={{ marginTop: '8px', fontSize: '14px' }}>{event.description}</p>
      {event.image && (
        <img
          src={event.image}
          alt={event.eventName}
          style={{ width: '100%', borderRadius: 8, marginTop: 10 }}
        />
      )}
    </div>
  );
}
