export default class ProductsDTO {
  constructor(productos) {
    (this._id = productos._id),
      (this.nombre = productos.nombre),
      (this.precio = productos.precio),
      (this.avatar = productos.avatar),
      (this.codigo = productos.codigo),
      (this.stock = productos.stock),
      (this.descripcion = productos.descripcion);
  }
}
