import { responseSuccess, responseError } from "../utils/response.js"
import { registerUser } from "../services/auth.service.js"

export const register = async (req, res) => {
    try{
        const { name, lastName, email, phone, address, password } = req.body;

        if (!name || !lastName || !email || !phone || !address || !password) {
            return responseError(res, "Todos los campos son obligatorios", 400);
        }

        const user = await registerUser({
            name,
            lastName,
            email,
            phone,
            address,
            password
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