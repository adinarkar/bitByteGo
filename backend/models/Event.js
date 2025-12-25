import mongoose from 'mongoose';
const MiniGameSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['tileBreaker', 'memoryFlip', 'guessNumber', 'maze'],
    required: true
  },
  rules: { type: String, default: 'Complete the game to reveal event details!' },
  difficulty: { type: String, default: 'easy' },
  unlocked: { type: Boolean, default: false }
});

const EventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDate: { type: String, required: true },
  eventVenue: { type: String, required: true },
  eventTime: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  locked: { type: Boolean, default: true },
  miniGame: { type: MiniGameSchema, required: true }
}, { timestamps: true });
export default mongoose.model("Event", EventSchema, "events");
