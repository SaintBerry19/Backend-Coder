import { Schema } from "mongoose";
import ContenedorMongoDB from "../../../contenedores/ContenedorMongoDB.js";

class CarritosDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super(
      "Carrito",
      new Schema(
        {
          userid: { type: String, require: true },
          productos: { type: [], require: true },
        },
        { timestamps: true }
      )
    );
  }

  async guardar(carrito = { productos: [] }) {
    return super.guardar(carrito);
  }

  async buscar(userid) {
    const result = await this.collection.find({ userid: userid }).lean();
    return result;
  }
}

export default CarritosDaoMongoDB;
