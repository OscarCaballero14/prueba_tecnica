export class OrderResponseDTO {
  constructor(order) {
    this.id = order._id;
    this.userId = order.user;
    this.status = order.status;

    this.items = order.items.map(item => ({
      productId: item.product,
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      subtotal: item.subtotal
    }));

    this.subtotal = order.subtotal;
    this.total = order.total;
    this.createdAt = order.createdAt;
  }
}
