// backend/routes/carouselroutes.js
import express from "express";
import CarouselProfile from "../models/Carousel.js";
import mongoose from "mongoose";

const router = express.Router();

/** 
 * GET all profiles (sorted by order)
 * Example: GET /api/carousel?active=true
 */
router.get("/", async (req, res) => {
  try {
    const { active } = req.query;
    const filter = {};
    if (active !== undefined) filter.active = active === "true";

    const profiles = await CarouselProfile.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(profiles);
  } catch (err) {
    console.error("GET /api/profiles error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/** 
 * GET a single profile 
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid ID" });

    const profile = await CarouselProfile.findById(id);
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error("GET /api/profiles/:id error:", err);
    res.status(500).json({ message: err.message });
  }
});

/** 
 * POST - Create new profile 
 */
router.post("/", async (req, res) => {
  try {
    const {
      name,
      title,
      handle,
      status,
      avatarUrl,
      miniAvatarUrl,
      behindGlowEnabled,
      innerGradient,
      order,
      active
    } = req.body;

    if (!name || !title || !handle || !avatarUrl)
      return res.status(400).json({ message: "Required fields missing" });

    const newProfile = new CarouselProfile({
      name,
      title,
      handle,
      status,
      avatarUrl,
      miniAvatarUrl,
      behindGlowEnabled,
      innerGradient,
      order,
      active
    });

    const saved = await newProfile.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("POST /api/carousel error:", err);
    res.status(500).json({ message: err.message });
  }
});

/** 
 * PUT - Update profile 
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid ID" });

    const updates = req.body;
    const updatedProfile = await CarouselProfile.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedProfile) return res.status(404).json({ message: "Profile not found" });
    res.json(updatedProfile);
  } catch (err) {
    console.error("PUT /api/carousel/:id error:", err);
    res.status(500).json({ message: err.message });
  }
});

/** 
 * DELETE - Remove profile 
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid ID" });

    const deleted = await CarouselProfile.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Profile not found" });

    res.json({ success: true, message: "Profile deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/carousel/:id error:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
