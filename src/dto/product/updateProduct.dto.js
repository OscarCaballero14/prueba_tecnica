export class UpdateProductDTO {
  constructor(data = {}) {
    const allowedFields = [
      "name",
      "description",
      "price",
      "currency",
      "stock",
      "isActive",
      "category"
    ];

    if (Object.keys(data).length === 0) {
      throw new Error("Debe enviar al menos un campo para actualizar");
    }

    for (const field of allowedFields) {
      if (data[field] !== undefined) {

        switch (field) {
          case "name":
          case "description":
          case "category":
            this[field] = data[field].trim();
            break;

          case "price":
          case "stock":
            if (data[field] < 0) {
              throw new Error(`${field} no puede ser negativo`);
            }
            this[field] = Number(data[field]);
            break;

          case "currency":
            if (data.currency.length !== 3) {
              throw new Error("La moneda debe tener 3 caracteres");
            }
            this.currency = data.currency.toUpperCase().trim();
            break;

          case "isActive":
            this.isActive = Boolean(data.isActive);
            break;
        }
      }
    }

    if (Object.keys(this).length === 0) {
      throw new Error("No se enviaron campos válidos para actualizar");
    }
  }
}
