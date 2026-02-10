import Payment from "../models/payment.js";

export const createPayment = (data) => {
  return Payment.create(data);
};

export const findPaymentByTransactionId = (transactionId) => {
  return Payment.findOne({ transactionId });
};

export const updatePaymentStatus = async (payment, status) => {
  payment.status = status;
  return payment.save();
};