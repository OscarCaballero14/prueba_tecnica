import { createOrder, findOrdersByUser, findAllProducts, findOrderById } from "../repositories/order.repository.js";
import { findProductById } from "../repositories/product.repository.js";

export const createPurchaseOrder = async (userId, items) => {
  if (!items || items.length === 0) {
    throw new Error("La orden debe tener al menos un producto");
  }

  let orderItems = [];
  let subtotal = 0;

  for (const item of items) {
    const product = await findProductById(item.productId);

    if (!product || !product.isActive) {
      throw new Error("Producto no disponible");
    }

    if (product.stock < item.quantity) {
      throw new Error(`Stock insuficiente para ${product.name}`);
    }

    const itemSubtotal = product.price * item.quantity;

    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      subtotal: itemSubtotal
    });

    subtotal += itemSubtotal;
  }

  const total = subtotal;

  const order = await createOrder({
    user: userId,
    items: orderItems,
    subtotal,
    total,
    status: "CREATED"
  });

  return order;
};

export const getOrdersByUser = async (userId) => {
  return await findOrdersByUser(userId);
};

export const getAllOrders = async () => {
  return await findAllProducts();
};

export const getOrderById = async (id) => {
  return await findOrderById(id);
};