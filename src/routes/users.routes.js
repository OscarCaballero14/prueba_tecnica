import { Router } from 'express';
import { 
    deleteUser, getUsers, 
    getUserById, updateUser 
} from "../controllers/users.controller.js";

const router = Router();

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.delete('/users/:id', deleteUser);

router.patch('/users/:id', updateUser);

export default router;