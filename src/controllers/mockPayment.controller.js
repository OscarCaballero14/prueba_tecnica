import crypto from "crypto";
import { WEBHOOK_SECRET } from "../config/config.js";
import { responseSuccess, responseError } from "../utils/response.js"

const URL = "http://localhost:5000";

export const simulatePayment = async (req, res) => {
  try {
    const { transactionId, status } = req.body;

    if (!transactionId) {
      return responseError(res, "transactionId requerido", 400);
    }

    const paymentStatus = status == "PAID" ? "SUCCEEDED" : "FAILED";

    const event = {
      eventId: crypto.randomUUID(),
      transactionId,
      status: paymentStatus
    };

    const payload = JSON.stringify(event);

    const signature = crypto
      .createHmac("sha256", WEBHOOK_SECRET)
      .update(payload)
      .digest("hex");

    // 🔥 Dispara el webhook
    await fetch(`${URL}/payments/webhook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-signature": signature
      },
      body: payload
    });

    return responseSuccess(
      res, 
      {
        message: "Pago simulado",
        event
      }, 
      200
    )
  } catch (error) {
    return responseError(res, error.message, 400);
  }
};
