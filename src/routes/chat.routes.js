import { createChatRoom, getChatHistory } from "../controller/chat.controller.js";
import { createChatBot, deleteChatBot, listChatBots, updateChatBot } from "../controller/chatBot.controller.js";
import { getMessages, sendMessage } from "../controller/message.controller.js";
import authMiddileware from "../middleware/auth.middleware.js";
import { getChatGPTResponse } from "../utis/chatgpt.js";
import express from 'express'
const chatRoute=express.Router();

chatRoute.post("/create/chat-bot",authMiddileware, createChatBot);
chatRoute.put("/update/:id",authMiddileware, updateChatBot);
chatRoute.delete("/delete/:id",authMiddileware, deleteChatBot);
chatRoute.get("/list",authMiddileware, listChatBots);
chatRoute.post("/api/chatgpt-response",authMiddileware, getChatGPTResponse);

chatRoute.post("/create", authMiddileware,createChatRoom);
chatRoute.get("/:userId/history",authMiddileware, getChatHistory);
chatRoute.post("/message",authMiddileware, sendMessage);
chatRoute.get("/message/:roomId", authMiddileware,getMessages);
export default chatRoute;

