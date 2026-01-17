export class CreateUserDTO {
  constructor({ name, lastName, email, phone, address, password, role }) {
    if (!name || !lastName || !email || !phone || !address || !password || !role) {
      throw new Error("Todos los campos son obligatorios");
    }

    this.name = name.trim();
    this.lastName = lastName.trim();
    this.email = email.toLowerCase().trim();
    this.phone = phone.trim();
    this.address = address.trim();
    this.password = password;
    this.role = role.trim();
  }
}