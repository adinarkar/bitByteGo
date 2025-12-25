import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    handle: { type: String, required: true, trim: true },
    status: { type: String, default: "Online" },
    avatarUrl: { type: String, required: true, trim: true },
    miniAvatarUrl: { type: String, trim: true },
    behindGlowEnabled: { type: Boolean, default: false },
    innerGradient: {
      type: String,
      default: "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)",
    },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ✅ "profiles" matches your Atlas collection in DB "bbg"
export default mongoose.model("Profile", profileSchema, "profiles");
