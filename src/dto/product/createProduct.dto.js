export class CreateProductDTO {
  constructor({
    name,
    description,
    price,
    currency,
    stock,
    isActive,
    category
  }) {

    if (
      name === undefined ||
      description === undefined ||
      price === undefined ||
      currency === undefined ||
      stock === undefined ||
      isActive === undefined ||
      category === undefined
    ) {
      throw new Error("Todos los campos son obligatorios");
    }

    if (price < 0) {
      throw new Error("El precio no puede ser negativo");
    }

    if (stock < 0) {
      throw new Error("El stock no puede ser negativo");
    }

    if (currency.length !== 3) {
      throw new Error("La moneda debe tener 3 caracteres");
    }

    this.name = name.trim();
    this.description = description.trim();
    this.price = Number(price);
    this.currency = currency.toUpperCase().trim();
    this.stock = Number(stock);
    this.isActive = Boolean(isActive);
    this.category = category.trim();
  }
}
