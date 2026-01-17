export class UpdateUserDTO {
  constructor(data = {}) {
    const allowedFields = [
      "name",
      "lastName",
      "email",
      "phone",
      "address",
      "role"
    ];

    if (Object.keys(data).length === 0) {
      throw new Error("Debe enviar al menos un campo para actualizar");
    }

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        switch (field) {
          case "email":
            this.email = data.email.toLowerCase().trim();
            break;

          case "name":
          case "lastName":
          case "phone":
          case "address":
          case "role":
            this[field] = data[field].trim();
            break;
        }
      }
    }

    if (Object.keys(this).length === 0) {
      throw new Error("No se enviaron campos válidos para actualizar");
    }
  }
}
