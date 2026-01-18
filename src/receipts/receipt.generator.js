export const generateReceipt = (order, payment) => {
  return {
    receiptId: `receipt_${order._id}`,
    orderId: order._id,
    transactionId: payment.transactionId,
    amount: order.total,
    currency: order.currency,
    items: order.items.map(i => ({
      productId: i.productId,
      quantity: i.quantity,
      price: i.price
    })),
    paidAt: new Date().toISOString()
  };
};
