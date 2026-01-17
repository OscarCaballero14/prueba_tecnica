import crypto from "crypto";
import Payment from "../models/payment.js";
import Order from "../models/orders.js";

export const createPaymentIntent = async (dto) => {
  const order = await Order.findById(dto.orderId);

  if (!order) {
    throw new Error("Orden no encontrada");
  }

  if (order.status !== "CREATED") {
    throw new Error("La orden no puede pagarse en este estado");
  }

  const transactionId = crypto.randomUUID();

  const payment = await Payment.create({
    order: order._id,
    transactionId,
    amount: order.total
  });

  order.status = "PAYMENT_PENDING";
  await order.save();

  return {
    transactionId,
    amount: payment.amount,
    status: payment.status
  };
};
