import { responseSuccess, responseError } from "../utils/response.js"
import { registerUser, loginUser } from "../services/auth.service.js"

export const register = async (req, res) => {
  try{
    const { name, lastName, email, phone, address, password, role } = req.body;

    if (!name || !lastName || !email || !phone || !address || !password || !role) {
      return responseError(res, "Todos los campos son obligatorios", 400);
    }

    const user = await registerUser({
      name,
      lastName,
      email,
      phone,
      address,
      password,
      role
    });

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