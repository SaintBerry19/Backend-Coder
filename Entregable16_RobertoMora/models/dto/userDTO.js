export default class UserDTO {
  constructor(user) {
    (this._id = user._id),
      (this.username = user.username),
      (this.avatar = user.avatar),
      (this.email = user.email),
      (this.phone = user.phone);
  }
}
