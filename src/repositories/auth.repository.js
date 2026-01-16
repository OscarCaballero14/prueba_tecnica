import User from "../models/users.js";

export const createUser = async (userData) => {
  return await User.create(userData);
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findUserByPhoneNumber = async (phone) => {
  return await User.findOne({ phone });
};