export default class CarritoDTO {
  constructor(carrito) {
    (this._id = carrito._id),
      (this.userid = carrito.userid),
      (this.productos = carrito.productos);
  }
}
