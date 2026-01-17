export class CreatePaymentDTO {
  constructor({ orderId }) {
    if (!orderId) {
      throw new Error("orderId es obligatorio");
    }

    this.orderId = orderId;
  }
}
