import express from "express";
import { simulatePayment } from "../controllers/mockPayment.controller.js";

const router = express.Router();

router.post("/mock/pay", simulatePayment);

export default router;
