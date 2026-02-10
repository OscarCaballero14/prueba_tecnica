import Order from "../models/orders.js";

export const createOrder = async (data) => {
  return await Order.create(data);
};

export const findOrderById = async (id) => {
  return await Order.findById(id)
    .populate("user", "name lastName email")
    .populate("items.product", "name");
};

export const findOrdersByUser = async (userId) => {
  return await Order.find({ user: userId })
    .populate("user", "name lastName email")
    .populate("items.product", "name");
};

export const findAllProducts = async () => {
  return await Order.find();
};

export const findAllInforOrderById = (orderId) => {
  return Order.findById(orderId);
};

export const updateOrderStatus = async (order, status) => {
  order.status = status;
  return order.save();
};

export const markEmailAsSent = async (order) => {
  order.emailSent = true;
  return order.save();
};