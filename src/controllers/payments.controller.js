import { responseSuccess, responseError } from "../utils/response.js";
import Payment from "../models/payment.js";
import Order from "../models/orders.js";
import User from "../models/users.js";
import WebhookEvent from "../models/webhook.js";
import { createPaymentIntent, handlePaidPayment } from "../services/payments.service.js";
import { CreatePaymentDTO } from "../dto/payment/createPayment.js";

export const paymentWebhook = async (req, res) => {
  try {
    const { eventId, transactionId, status } = req.body;

    const alreadyProcessed = await WebhookEvent.findOne({ eventId });
    if (alreadyProcessed) {
      return responseSuccess(res, "Evento ya procesado", 200);
    }

    const payment = await Payment.findOne({ transactionId });
    if (!payment) {
      throw new Error("Pago no encontrado");
    }

    const order = await Order.findById(payment.order);
    const user = await User.findById(order.user);

    if (status === "SUCCEEDED") {
      payment.status = "SUCCEEDED";
      order.status = "PAID";
      await handlePaidPayment(order, payment, user);
    } else {
      payment.status = "FAILED";
      order.status = "FAILED";
    }

    await payment.save();
    await order.save();

    await WebhookEvent.create({ eventId });

    return responseSuccess(res, "Webhook procesado", 200);

  } catch (error) {
    return responseError(res, error.message, 400);
  }
};

export const initPayment = async (req, res) => {
  try {
    const createPaymentDTO = new CreatePaymentDTO({
      orderId: req.body.orderId
    });

    const payment = await createPaymentIntent(createPaymentDTO);

    return responseSuccess(
      res,
      {
        message: "Proceso de pago iniciado",
        payment
      },
      201
    );
  } catch (error) {
    return responseError(res, error.message, 400);
  }
};