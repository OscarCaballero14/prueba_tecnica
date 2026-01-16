import { createUser, findUserByEmail, findUserByPhoneNumber } from "../repositories/auth.repository.js";

export const registerUser = async (userData) => {
  const { email, phone } = userData;

  const userExists = await findUserByEmail(email);
  if (userExists) {
    throw new Error("El email ya está registrado");
  }

  const numberExists = await findUserByPhoneNumber(phone);
  if (numberExists) {
    throw new Error("El numero de teléfono ya está registrado");
  }

  const user = await createUser(userData);

  user.password = undefined;

  return user;
};