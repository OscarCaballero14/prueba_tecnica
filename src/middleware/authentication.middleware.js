import jwt from "jsonwebtoken";
import { responseError } from "../utils/response.js";
import { JWT_SECRET } from "../config/config.js";

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return responseError(res, "Token requerido", 401);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return responseError(res, "Token inválido o expirado", 401);
  }
};
