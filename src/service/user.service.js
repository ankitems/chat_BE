import UserModel from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
export const registerUser = async (email, password, phone, userName, role) => {
  const existingUser = await UserModel.findOne({ userName: userName });

  if (existingUser) {
    throw new Error("User already exists");
  }
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(password, saltRound);

  const newUser = new UserModel({ email, password: hashedPassword, phone, userName, role });

  await newUser.save();
  return newUser;
};

export const authenticateUser = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    const user = await UserModel.findOne({ userName });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET
    );

    return res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};
