import express from "express";
import { getUserById, login, signup } from "../controller/user.controller.js";
import {
  createChatBot,
  deleteChatBot,
  listChatBots,
  updateChatBot,
} from "../controller/chatBot.controller.js";

import { getChatGPTResponse } from "../utis/chatgpt.js";
import {
  createChatRoom,
  getChatHistory,
} from "../controller/chat.controller.js";
import { getMessages, sendMessage } from "../controller/message.controller.js";

const router = express.Router();
router.post("/login", login);
router.post("/signup", signup);
router.get("/user/:userId", getUserById);
router.post("/create/chat-bot", createChatBot);
router.put("/update/:id", updateChatBot);
router.delete("/delete/:id", deleteChatBot);
router.get("/list", listChatBots);
router.post("/api/chatgpt-response", getChatGPTResponse);

router.post("/create", createChatRoom);
router.get("/:userId/history", getChatHistory);
router.post("/message", sendMessage);
router.get("/message/:roomId", getMessages);
export default router;
