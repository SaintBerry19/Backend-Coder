import { Schema } from 'mongoose'

import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js"

class CarritosDaoMongoDB extends ContenedorMongoDB {

  constructor() {
    super('Carrito', new Schema({
      productos: { type: [], require: true },
    },{ timestamps: true }))
  }

  async guardar(carrito = { productos: [] }) {
    return super.guardar(carrito)
  }
}

export default CarritosDaoMongoDB
