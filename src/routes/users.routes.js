import { Router } from 'express';
import { 
    deleteUser, getUsers, getUserById, updateUser 
} from "../controllers/users.controller.js";
import { authenticate } from "../middleware/authentication.middleware.js";
import { authorize } from "../middleware/authorization.middleware.js";

const router = Router();

router.get('/users', authenticate, authorize(["admin"]), getUsers);

router.get('/users/:id', authenticate, authorize(["admin"]), getUserById);

router.delete('/users/:id', authenticate, authorize(["admin"]), deleteUser);

router.patch('/users/:id', authenticate, authorize(["admin"]), updateUser);

export default router;