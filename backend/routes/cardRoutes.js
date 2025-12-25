// backend/routes/cardRoutes.js
import express from "express";
import Card from "../models/Card.js";

const router = express.Router();

// GET all cards
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: -1 });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new card (admin use)
router.post("/create", async (req, res) => {
  try {
    const { title, description, image } = req.body;

    if (!title || !description || !image) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newCard = new Card({ title, description, image });
    const saved = await newCard.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
