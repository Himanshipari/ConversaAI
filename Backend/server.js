// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";

// import "dotenv/config";
// import cors from "cors";
// import mongoose from "mongoose";
// import chatRoutes from "./routes/chat.js";

// import authRoutes from "./routes/auth.js";//authorisation

// const app = express();
// const PORT = process.env.PORT || 8080;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.json());
// app.use(cors());

// app.use("/api/auth", authRoutes);

// app.use("/api", chatRoutes);




// // frontend serve
// const distPath = path.join(__dirname, "../Frontend/dist");
// app.use(express.static(distPath));

// // SPA fallback (SAFE for all Express versions)
// app.use((req, res) => {
//   res.sendFile(path.join(distPath, "index.html"));
// });

// // DB connect
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("DB connected");
//   } catch (err) {
//     console.log("DB error", err);
//   }
// };

// app.listen(PORT, async () => {
//   console.log("Server running on", PORT);
//   await connectDB();
// });



import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";

import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Export io so it can be used inside routes/controllers
export { io };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", chatRoutes);

// ================= Socket.IO =================
io.on("connection", (socket) => {
  console.log(`✅ User Connected : ${socket.id}`);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined room ${roomId}`);
  });

  socket.on("leave_room", (roomId) => {
    socket.leave(roomId);
    console.log(`${socket.id} left room ${roomId}`);
  });

  socket.on("send_message", (messageData) => {
    socket.to(messageData.roomId).emit("receive_message", messageData);
  });

  socket.on("disconnect", () => {
    console.log(`❌ User Disconnected : ${socket.id}`);
  });
});

// ================= Frontend =================
const distPath = path.join(__dirname, "../Frontend/dist");

app.use(express.static(distPath));

app.get("/*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// ================= MongoDB =================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
};

// ================= Start Server =================
server.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
});