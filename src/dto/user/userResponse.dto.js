export class UserResponseDTO {
  constructor(user) {
    this.id = user._id;
    this.name = user.name;
    this.lastName = user.lastName;
    this.email = user.email;
    this.phone = user.phone;
    this.address = user.address;
    this.role = user.role;
    this.createdAt = user.createdAt;
  }
}