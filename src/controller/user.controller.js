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
  try {
    const data = await authenticateUser(req, res);
    return data

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};


export const getUserByUserName = async (req, res) => {
  const { userName } = req.params;
  try {
    const user = await UserModel.findOne({userName});
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ error: "Failed to retrieve user" });
  }
};
