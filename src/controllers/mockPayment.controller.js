import crypto from "crypto";
import { WEBHOOK_SECRET } from "../config/config.js";

const URL = "http://localhost:5000";

export const simulatePayment = async (req, res) => {
  try {
    const { transactionId, status } = req.body;

    console.log(transactionId, status);

    if (!transactionId) {
      return res.status(400).send("transactionId requerido");
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

    return res.status(200).json({
      message: "Pago simulado",
      event
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
