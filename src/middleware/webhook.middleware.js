import crypto from "crypto";
import { WEBHOOK_SECRET } from "../config/config.js"

export const verifyWebhookSignature = (req, res, next) => {
  const signature = req.headers["x-webhook-signature"];

  if (!signature) {
    return res.status(401).send("Firma faltante");
  }

  const payload = req.rawBody;

  const expectedSignature = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(payload)
    .digest("hex");

  if (signature !== expectedSignature) {
    return res.status(401).send("Firma inválida");
  }

  next();
};
