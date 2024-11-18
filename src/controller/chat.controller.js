import ChatService from "../service/chat.service.js";

export const createChatRoom = async (req, res) => {
  const { user1Id, user2Id } = req.body;

  try {
    const chatRoom = await ChatService.createChatRoom(user1Id, user2Id);
    return res.status(201).json({ chatRoom });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error creating chat room", error: err });
  }
};

export const getChatHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const chats = await ChatService.getChatHistory(userId);
    return res.status(200).json({ chats });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching chat history", error: err });
  }
};
