import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
  message: { type: String, required: true },
  messageType: {
    type: String,
    enum: ["text", "image", "file"],
    default: "text",
  },
  timestamp: { type: Date, default: Date.now },
});

const MessageModel = mongoose.model("Message", messageSchema);

export default MessageModel;
