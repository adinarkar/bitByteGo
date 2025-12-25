import mongoose from "mongoose";

const EventCarouselSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
    image: { type: String, required: true },
    eventDate: { type: String },
    link: { type: String }, // optional - could link to event details
  },
  { timestamps: true }
);

export default mongoose.model("EventCarousel", EventCarouselSchema, "eventcarousel");
