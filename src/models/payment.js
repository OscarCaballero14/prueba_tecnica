import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true
  },

  transactionId: {
    type: String,
    required: true,
    unique: true
  },

  amount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["PENDING", "SUCCEEDED", "FAILED"],
    default: "PENDING"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Payment", PaymentSchema);
