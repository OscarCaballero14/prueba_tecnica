import User from "../models/users.js";

export const updateUser = async (id, userData) => {
  return await User.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true
  });
}

export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

export const findUserByPhoneNumber = async (phone) => {
    return await User.findOne({ phone });
};

export const findAllUsers = async () => {
  return await User.find();
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const deleteUserById = async (id) => {
  return await User.findByIdAndDelete(id);
};