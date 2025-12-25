import express from "express";
import Gallery from "../models/gallery.js";

const router = express.Router();

// GET all gallery items
router.get("/", async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new gallery item
router.post("/create", async (req, res) => {
  try {
    const { title, image, description } = req.body;
    if (!title || !image) {
      return res.status(400).json({ message: "Title and image are required" });
    }

    const newItem = new Gallery({ title, image, description });
    const saved = await newItem.save();
    res.status(201).json({ success: true, gallery: saved });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
