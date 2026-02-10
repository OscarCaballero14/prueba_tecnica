import crypto from "crypto";
import { sendPaymentConfirmationEmail } from "../services/email.service.js";
import { 
  findAllInforOrderById, updateOrderStatus, markEmailAsSent 
} from "../repositories/order.repository.js";
import { createPayment } from "../repositories/payments.repository.js";

export const createPaymentIntent = async (dto) => {
  const order = await findAllInforOrderById(dto.orderId);

  if (!order) {
    throw new Error("Orden no encontrada");
  }

  if (order.status !== "CREATED") {
    throw new Error("La orden no puede pagarse en este estado");
  }

  const transactionId = crypto.randomUUID();

  const payment = await createPayment({
    order: order._id,
    transactionId,
    amount: order.total
  });

  await updateOrderStatus(order, "PAYMENT_PENDING");

  return {
    transactionId,
    amount: payment.amount,
    status: payment.status
  };
};

export const handlePaidPayment = async (order, payment, user) => {
  try {
    await sendPaymentConfirmationEmail(user, order);
    await markEmailAsSent(order);
  } catch (err) {
    console.error("Error enviando email:", err.message);
  }
};