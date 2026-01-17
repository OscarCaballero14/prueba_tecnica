import { createPurchaseOrder, getOrdersByUser, getAllOrders, getOrderById } from "../services/order.service.js";
import { responseSuccess, responseError } from "../utils/response.js";
import { CreateOrderDTO } from "../dto/order/createOrder.dto.js"

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;

    const createOrderDTO = new CreateOrderDTO({userId, items});

    const order = await createPurchaseOrder(createOrderDTO);

    return responseSuccess(
      res,
      {
        message: "Orden creada correctamente",
        order
      },
      201
    );
  } catch (error) {
    return responseError(res, error.message, 400);
  }
};

export const OrdersByUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const orders = await getOrdersByUser(userId);

    return responseSuccess(res, { orders });
  } catch (error) {
    return responseError(res, error.message, 400);
  }
};

export const allOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();

    return responseSuccess(res, { orders });
  } catch (error) {
    return responseError(res, error.message, 400);
  }
};

export const oneOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await getOrderById(id);

    if (!order){
      return responseError(res, "No existe la orden", 404);
    }

    return responseSuccess(res, { order });
  } catch (error) {
    return responseError(res, error.message, 400);
  }
};