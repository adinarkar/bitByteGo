import express from "express";
import EventCarousel from "../models/EventCarousel.js";

const router = express.Router();

// ✅ GET all carousel events
router.get("/", async (req, res) => {
  try {
    const items = await EventCarousel.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST create new carousel item (admin use)
router.post("/create", async (req, res) => {
  try {
    const { title, subtitle, description, image, eventDate, link } = req.body;

    if (!title || !image) {
      return res.status(400).json({ message: "Title and image are required" });
    }

    const newItem = new EventCarousel({
      title,
      subtitle,
      description,
      image,
      eventDate,
      link,
    });

    const saved = await newItem.save();
    res.status(201).json({ success: true, item: saved });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
