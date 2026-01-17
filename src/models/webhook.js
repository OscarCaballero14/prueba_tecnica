import mongoose from "mongoose";

const WebhookEventSchema = new mongoose.Schema({
  eventId: {
    type: String,
    unique: true,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("WebhookEvent", WebhookEventSchema);
