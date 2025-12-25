import React, { useEffect, useState } from "react";
import CircularGallery from "./CircularGallery/CircularGallery.jsx";

export default function CircularGalleryFrontend() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          image: item.image,
          text: item.title,
        }));
        setItems(formatted);
      })
      .catch((err) => console.error("Error fetching gallery:", err));
  }, []);

  return (
    <div style={{ height: "600px", position: "relative" }}>
      <CircularGallery
        items={items}
        bend={0}
        textColor="#ffffff"
        borderRadius={0.05}
        scrollEase={0.02}
      />
    </div>
  );
}
