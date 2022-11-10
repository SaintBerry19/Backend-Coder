import { Schema } from "mongoose";

import ContenedorFireBase from "../../contenedores/ContenedorFireBase.js";

class CarritosDaoFireBase extends ContenedorFireBase {
  constructor() {
    super("Carritos");
  }
  async guardar(carrito = { productos: [] }) {
    return super.guardar(carrito)
  }
}

export default CarritosDaoFireBase;
