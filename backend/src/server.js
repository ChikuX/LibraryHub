/**
 * Express server — College Digital Library API.
 * Read-only endpoints. No auth required.
 */
import "dotenv/config";
import express from "express";
import cors from "cors";
import notesRouter from "./routes/notes.js";
import pyqsRouter from "./routes/pyqs.js";
import pool from "./db.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ──────────────────────────────────────────────
app.use(
  cors({
    // origin: process.env.FRONTEND_URL || "http://localhost:8080",
    origin: "*",
    methods: ["GET"],
  })
);
app.use(express.json());

// ─── Routes ─────────────────────────────────────────────────
app.use("/api", notesRouter);
app.use("/api", pyqsRouter);

app.get("/ping", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({ status: "ok", message: "Pong" });
  } catch (e) {
    res.status(500).send("Database connection failed")
  }
});

// Health check
app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "College Digital Library API" });
});

// ─── Start ──────────────────────────────────────────────────
app.listen(PORT, "0.0.0.0", () => {
  // console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(`Server is running at port: ${PORT || "0.0.0.0"}`)
});
