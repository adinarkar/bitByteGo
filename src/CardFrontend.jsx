// frontend/src/components/CardFrontend.jsx
import React, { useEffect, useState } from "react";
import CardSwap, { Card } from "./componentsy/CardSwap/CardSwap.jsx";

const CardFrontend = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/cards")
      .then((res) => res.json())
      .then((data) => setCards(data))
      .catch((err) => console.error("Error fetching cards:", err));
  }, []);

  if (!cards.length) {
    return ("no data available");
  }

  return (
    <div style={{ height: "600px", position: "relative" }}>
      <CardSwap cardDistance={60} verticalDistance={70} delay={5000}>
        {cards.map((card, i) => (
          <Card key={card._id || i} customClass="card-item">
            <img
              src={card.image}
              alt={card.title}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
              }}
            />
            <div style={{ padding: "16px", color: "#fff", textAlign: "center" }}>
              <div className="txtcard-title">{card.title}</div>
              <div className="txtcard">{card.description}</div>
            </div>
          </Card>
        ))}
      </CardSwap>
    </div>
  );
};

export default CardFrontend;
