import { createOrder, findOrdersByUser, findAllProducts, findOrderById } from "../repositories/order.repository.js";
import { findProductById } from "../repositories/product.repository.js";
import { OrderResponseDTO } from "../dto/order/orderResponse.dto.js";

export const createPurchaseOrder = async (dataOrden) => {
  const { userId, items } = dataOrden;

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

  return new OrderResponseDTO(order);
};

export const getOrdersByUser = async (userId) => {
  const orders = await findOrdersByUser(userId);

  return orders.map(order => {
    return new OrderResponseDTO(order);
  });
};

export const getAllOrders = async () => {
  const orders = await findAllProducts();

  return orders.map(order => {
    return new OrderResponseDTO(order);
  });
};

export const getOrderById = async (id) => {
  const order = await findOrderById(id);
  
  if (!order) {
    throw new Error("Orden no encontrada");
  }
  return new OrderResponseDTO(order);
};