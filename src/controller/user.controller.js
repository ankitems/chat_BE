import UserModel from "../models/user.models.js";
import { authenticateUser, registerUser } from "../service/user.service.js";

export const signup = async (req, res) => {
  const { email, password, phone, userName, role } = req.body;

  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const newUser = await registerUser(email, password, phone, userName, role);
    if (newUser) {
      res.send(newUser);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const data = await authenticateUser(userName, password);
    if (data.length) {
      res.status(200).json({ message: "Login successful.", data: data });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user" });
  }
};
