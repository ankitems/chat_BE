import MessageService from "../service/message.service.js";
import { login } from "./user.controller.js";

export const sendMessage = async (req, res) => {
  const { senderId, roomId, message } = req.body;

  try {
    console.log("11111111111111111111111");
    const newMessage = await MessageService.sendMessage(
      senderId,
      roomId,
      message
    );
    return res.status(201).json({ message: newMessage });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error sending message", error: err });
  }
};

export const getMessages = async (req, res) => {
  const { roomId } = req.params;

  try {
    const messages = await MessageService.getMessages(roomId);
    return res.status(200).json({ data: messages });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching messages", error: err });
  }
};
