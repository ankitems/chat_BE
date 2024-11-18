import bodyParser from "body-parser";
import express from "express";
import connectDB from "./src/config/db.config.js";
import router from "./src/routes/routes.js";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import MessageModel from "./src/models/message.models.js";
import MessageService from "./src/service/message.service.js";
import mongoose from "mongoose";
import Chat from "./src/models/chat.models.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Define routes
app.use(router);

// Socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join_room", async (roomId) => {
    socket.join(roomId);
    try {
      const chat = await Chat.findOne({ roomName: roomId });
      if (!chat) throw new Error("Chat room not found");

      const messages = await MessageModel.find({ roomId: chat._id });
      socket.emit("chatHistory", messages);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  });

  socket.on("send_message", async (data) => {
    const { roomId, message, senderId } = data;

    io.to(roomId).emit("receive_message", { senderId, message });

    try {
      await MessageService.sendMessage(roomId, senderId, message);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start the server
const port = 7000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
