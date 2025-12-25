import React, { useEffect, useState } from "react";
import "./EventCarousel.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001";

export default function EventCarousel() {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Fetch carousel data dynamically from backend (MongoDB Atlas)
  useEffect(() => {
    async function fetchCarousel() {
      try {
        const res = await fetch(`${API_BASE}/api/eventcarousel`);
        const data = await res.json();
        console.log("Fetched carousel data:", data);
        setEvents(data);
      } catch (err) {
        console.error("Error fetching carousel data:", err);
      }
    }
    fetchCarousel();
  }, []);

  // ✅ Auto-scroll every 5 seconds
  useEffect(() => {
    if (events.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === events.length - 1 ? 0 : prev + 1
      );
    }, 5001);
    return () => clearInterval(interval);
  }, [events]);

  if (events.length === 0) return <p>Loading events...</p>;

  return (
    <div className="carousel-container">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {events.map((e, idx) => (
          <div className="carousel-item" key={idx}>
            <img
              src={e.image || "https://picsum.photos/800/600"}
              alt={e.title || e.eventName || "Event"}
              className="carousel-image"
              onClick={() => window.open(e.link || e.image, "_blank")}
            />
            <div className="carousel-caption">
              <h2>{e.title || e.eventName}</h2>
              {e.subtitle && <h4>{e.subtitle}</h4>}
              <p>{e.eventDate}</p>
              {e.description && <small>{e.description}</small>}
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-dots">
        {events.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
