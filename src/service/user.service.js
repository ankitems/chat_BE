import UserModel from "../models/user.models.js";

export const registerUser = async (email, password, phone, userName, role) => {
  const existingUser = await UserModel.findOne({ userName: userName });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const newUser = new UserModel({ email, password, phone, userName, role });

  await newUser.save();
  return newUser;
};

export const authenticateUser = async (userName, password) => {
  const existingUser = await UserModel.find({
    userName: userName,
    password: password,
  });
  if (existingUser.length > 0) {
    return existingUser;
  } else {
    throw new Error("Invalid Username and Password");
  }
};
