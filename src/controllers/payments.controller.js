import { responseSuccess, responseError } from "../utils/response.js";
import { processPaymentWebhook } from "../services/paymentWebhook.service.js";
import { createPaymentIntent } from "../services/payments.service.js";
import { CreatePaymentDTO } from "../dto/payment/createPayment.js";

export const paymentWebhook = async (req, res) => {
  try {
    const result = await processPaymentWebhook(req.body);

    if (result.alreadyProcessed) {
      return responseSuccess(res, "Evento ya procesado", 200);
    }

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