// backend/server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";

// your existing routes
import eventRoutes from "./routes/eventRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import eventCarouselRoutes from "./routes/eventCarouselRoutes.js";

import profileRoutes from "./routes/profileRoutes.js";

// optional: the carousel/profile routes we added earlier
// if you created backend/routes/carouselroutes.js (profile schema) use this:


dotenv.config();

const app = express();

// --- Middleware ---
app.use(cors()); // allow all origins by default; restrict in production if needed
app.use(express.json({ limit: "10mb" })); // parse json bodies
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// --- Health check ---
app.get("/health", (req, res) => res.json({ ok: true, uptime: process.uptime() }));

// --- API Routes ---
app.use("/api/events", eventRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/eventcarousel", eventCarouselRoutes);

// mount the new carousel/profile route (if you created it)

app.use("/api/profiles", profileRoutes);

// --- Serve static in production (optional) ---
// If you build a frontend and place it in ../frontend/dist or ../client/build
if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.resolve(process.cwd(), "frontend", "dist");
  app.use(express.static(clientBuildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

// --- Error handling middleware (simple) ---
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || "Internal server error"
  });
});

// --- Database connection & server start ---
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/eventsDB";

async function start() {
  try {
    // mongoose connection
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("MongoDB connected");

    // start server
    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT} (env: ${process.env.NODE_ENV || "dev"})`);
    });

    // graceful shutdown
    const shutdown = async (signal) => {
      console.log(`\nReceived ${signal}. Closing server and MongoDB connection...`);
      server.close(async (err) => {
        if (err) {
          console.error("Error closing server:", err);
          process.exit(1);
        }
        try {
          await mongoose.connection.close(false);
          console.log("MongoDB connection closed.");
          process.exit(0);
        } catch (closeErr) {
          console.error("Error closing MongoDB connection:", closeErr);
          process.exit(1);
        }
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));

  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
