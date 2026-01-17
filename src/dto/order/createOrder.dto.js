export class CreateOrderDTO {
  constructor({ userId, items }) {

    if (!userId) {
      throw new Error("El userId es obligatorio");
    }

    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("La orden debe tener al menos un producto");
    }

    this.userId = userId;

    this.items = items.map(item => {
      if (!item.productId || !item.quantity) {
        throw new Error("Cada producto debe tener productId y quantity");
      }

      if (item.quantity <= 0) {
        throw new Error("La cantidad debe ser mayor a 0");
      }

      return {
        productId: item.productId,
        quantity: Number(item.quantity)
      };
    });
  }
}
