import express from "express";
import mongoose from "mongoose";
import Profile from "../models/profile.js";
const router = express.Router();

/** ✅ GET all profiles */
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ order: 1, createdAt: -1 });
    res.json(profiles);
  } catch (err) {
    console.error("GET /api/profiles error:", err);
    res.status(500).json({ message: err.message });
  }
});

/** ✅ POST - Add new profile */
router.post("/", async (req, res) => {
  try {
    const profile = new Profile(req.body);
    const saved = await profile.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("POST /api/profiles error:", err);
    res.status(400).json({ message: err.message });
  }
});

/** ✅ PUT - Update profile by ID */
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: "Invalid ID" });

    const updated = await Profile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Profile not found" });
    res.json(updated);
  } catch (err) {
    console.error("PUT /api/profiles error:", err);
    res.status(500).json({ message: err.message });
  }
});

/** ✅ DELETE - Remove profile */
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: "Invalid ID" });

    const deleted = await Profile.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Profile not found" });
    res.json({ success: true, message: "Profile deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/profiles error:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;

