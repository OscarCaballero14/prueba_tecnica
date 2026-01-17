import express from "express";
import { createOrder, OrdersByUser, allOrders, oneOrder  } from "../controllers/order.controller.js";
import { authenticate } from "../middleware/authentication.middleware.js";
import { authorize } from "../middleware/authorization.middleware.js";

const router = express.Router();

router.post("/orders", authenticate, authorize(["user"]), createOrder);

router.get("/orders/user/:id", authenticate, authorize(["user", "admin"]), OrdersByUser);

router.get("/orders", authenticate, authorize(["admin"]), allOrders);

router.get("/orders/:id", authenticate, authorize(["admin"]), oneOrder);

export default router;
