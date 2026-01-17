import { responseError } from "../utils/response.js";

/**
 * @param {Array<string>} allowedRoles
 */
export const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return responseError(res, "No autenticado", 401);
    }

    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      return responseError(res, "No autorizado", 403);
    }

    next();
  };
};
