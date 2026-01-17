import { responseSuccess, responseError } from "../utils/response.js";
import { update, getAllUsers, getUser, removeUser } from "../services/user.service.js";
import { UpdateUserDTO } from "../dto/user/updateUser.dto.js"

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    return responseSuccess(res, users, 200);
  } catch (error) {
    return responseError(res, error.message, 500);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    return responseSuccess(res, user, 200);
  } catch (error) {
    return responseError(res, error.message, 404);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await removeUser(req.params.id);
    return res.sendStatus(204);
  } catch (error) {
    return responseError(res, error.message, 404);
  }
};

export const updateUser = async (req, res) => {
  try {
    const updateUserDTO = new UpdateUserDTO(req.body);
    
    const user = await update(req.params.id, updateUserDTO);

    return responseSuccess(
      res,
      {
        message: "El registro se ha actualizado correctamente",
        user: user
      },
      201
    );
  } catch (error) {
    return responseError(res, error.message, 400);
  }
}