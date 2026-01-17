import express from "express";
import { initPayment, paymentWebhook } from "../controllers/payments.controller.js";
import { verifyWebhookSignature } from "../middleware/webhook.middleware.js";

const router = express.Router();

router.post("/payments/init", initPayment);
router.post("/payments/webhook", verifyWebhookSignature, paymentWebhook);

export default router;
