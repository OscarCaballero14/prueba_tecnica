import { saveWebhookEvent, isEventProcessed } from "../repositories/paymentWebhook.repository.js";
import { findPaymentByTransactionId, updatePaymentStatus } from "../repositories/payments.repository.js";
import { findAllInforOrderById, updateOrderStatus } from "../repositories/order.repository.js";
import { findUserById } from "../repositories/user.repository.js";
import { handlePaidPayment } from "../services/payments.service.js";

export const processPaymentWebhook = async ({ eventId, transactionId, status }) => {

  const alreadyProcessed = await isEventProcessed(eventId);
  if (alreadyProcessed) {
    return { alreadyProcessed: true };
  }

  const payment = await findPaymentByTransactionId(transactionId);
  if (!payment) {
    throw new Error("Pago no encontrado");
  }

  const order = await findAllInforOrderById(payment.order);
  const user = await findUserById(order.user);

  if (status === "SUCCEEDED") {
    await updatePaymentStatus(payment, "SUCCEEDED");
    await updateOrderStatus(order, "PAID");
    await handlePaidPayment(order, payment, user);
  } else {
    await updatePaymentStatus(payment, "FAILED");
    await updateOrderStatus(order, "FAILED");
  }

  await saveWebhookEvent(eventId);

  return { success: true };
};