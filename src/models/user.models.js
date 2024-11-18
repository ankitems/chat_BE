import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  phone: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true }, // Corrected 'required' here
  userName: { type: String, required: true, unique: true }, // Corrected 'required' here
  role: { type: String, required: true, enum: ["user", "admin"] },
  chatHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  ],
});

const UserModel = mongoose.model("User", userSchema); // Capitalized 'User' to follow Mongoose conventions

export default UserModel;
