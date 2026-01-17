import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail, findUserByPhoneNumber } from "../repositories/auth.repository.js";
import { JWT_SECRET } from "../config/config.js"
import { UserResponseDTO } from "../dto/user/userResponse.dto.js";

export const registerUser = async (userData) => {
  const { email, phone, password, role } = userData;

  const userExists = await findUserByEmail(email);
  if (userExists) {
    throw new Error("El email ya está registrado");
  }

  const numberExists = await findUserByPhoneNumber(phone);
  if (numberExists) {
    throw new Error("El numero de teléfono ya está registrado");
  }

  const hashedPassword = await hashPassword(password);

  const user = await createUser({
    ...userData,
    password: hashedPassword,
    role: role.toLowerCase()
  });

  return new UserResponseDTO(user);
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Credenciales inválidas");
  }

  const credentials = {
    id: user._id,
    email: user.email,
    role: user.role
  };

  const token = jwt.sign(credentials, JWT_SECRET, {
    expiresIn: "1d"
  });

  user.password = undefined;

  return {
    user,
    token
  };
};