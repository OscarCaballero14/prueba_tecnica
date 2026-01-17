import { responseSuccess, responseError } from "../utils/response.js"
import { registerUser, loginUser } from "../services/auth.service.js"
import { CreateUserDTO } from "../dto/user/createUser.dto.js"

export const register = async (req, res) => {
  try{
    const createUserDTO = new CreateUserDTO(req.body);

    const user = await registerUser(createUserDTO);

    return responseSuccess(
      res,
      {
        message: "El registro se ha realizado correctamente",
        user: user
      },
      201
    );
  }catch(error){
      return responseError(res, error.message, 400);
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return responseError(res, "Email y password son obligatorios", 400);
    }

    const data = await loginUser({ email, password });

    return responseSuccess(
      res,
      {
        message: "Login exitoso",
        ...data
      },
      200
    );

  } catch (error) {
    return responseError(res, error.message, 401);
  }
};