import { 
    updateUser, findUserByEmail, findUserByPhoneNumber, findUserById,
    findAllUsers, deleteUserById
} from "../repositories/user.repository.js";
import { UserResponseDTO } from "../dto/user/userResponse.dto.js"

export const update = async (id, userData) => {
    const user = await findUserById(id);
    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    if (userData.email && userData.email !== user.email) {
        const emailInUse = await findUserByEmail(userData.email);

        if (emailInUse && emailInUse._id.toString() !== id) {
            throw new Error("El correo electrónico ya está en uso");
        }
    }

    if (userData.phone && userData.phone !== user.phone) {
        const phoneInUse = await findUserByPhoneNumber(userData.phone);

        if (phoneInUse && phoneInUse._id.toString() !== id) {
            throw new Error("El teléfono ya está en uso");
        }
    }

    const result = updateUser(id, userData, { new: true });

    return new UserResponseDTO(result);
}

export const getAllUsers = async () => {
    const users = await findAllUsers();

    return users.map(user => {
        return new UserResponseDTO(user);
    });
};

export const getUser = async (userId) => {
    const user = await findUserById(userId);

    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    return new UserResponseDTO(user);
};

export const removeUser = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  await deleteUserById(userId);
};