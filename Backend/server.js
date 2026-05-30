import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

// frontend serve
const distPath = path.join(__dirname, "../Frontend/dist");
app.use(express.static(distPath));

// SPA fallback (SAFE for all Express versions)
app.use((req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// DB connect
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected");
  } catch (err) {
    console.log("DB error", err);
  }
};

app.listen(PORT, async () => {
  console.log("Server running on", PORT);
  await connectDB();
});