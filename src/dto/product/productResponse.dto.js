export class ProductResponseDTO {
  constructor(product) {
    this.id = product._id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.currency = product.currency;
    this.stock = product.stock;
    this.isActive = product.isActive;
    this.category = product.category;
    this.createdAt = product.createdAt;
  }
}