import express from 'express';
import Event from '../models/Event.js';


const router = express.Router();

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new event (admin)
router.post('/create', async (req, res) => {
  try {
    const {
      eventName,
      eventDate,
      eventVenue,
      eventTime,
      description,
      image,
      miniGameType,
      rules,
      difficulty
    } = req.body;

    if (!miniGameType) {
      return res.status(400).json({ message: 'miniGameType is required' });
    }

    const newEvent = new Event({
      eventName,
      eventDate,
      eventVenue,
      eventTime,
      description,
      image,
      locked: true,
      miniGame: {
        type: miniGameType,
        rules: rules || 'Complete the game to reveal event details!',
        difficulty: difficulty || 'easy'
      }
    });

    const saved = await newEvent.save();
    res.status(201).json({ success: true, event: saved });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Unlock event (mark unlocked in DB) - call when client wins minigame
router.post('/:id/unlock', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    event.locked = false;
    event.miniGame.unlocked = true;
    await event.save();

    res.json({ success: true, event });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
