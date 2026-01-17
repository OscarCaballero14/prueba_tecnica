import Order from "../models/orders.js";

export const createOrder = async (data) => {
  return await Order.create(data);
};

export const findOrderById = async (id) => {
  return await Order.findById(id)
    .populate("user", "name email")
    .populate("items.product", "name");
};

export const updateOrderStatus = async (id, status) => {
  return await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
};

export const findOrdersByUser = async (userId) => {
  return await Order.find({ user: userId })
    .populate("user", "name lastName email")
    .populate("items.product", "name");
};

export const findAllProducts = async () => {
  return await Order.find();
};