import WebhookEvent from "../models/webhook.js";

export const isEventProcessed = (eventId) => {
  return WebhookEvent.findOne({ eventId });
};

export const saveWebhookEvent = (eventId) => {
  return WebhookEvent.create({ eventId });
};