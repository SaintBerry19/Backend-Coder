import { Schema } from 'mongoose'
import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js"

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super('Producto', new Schema({
          nombre: { type: String, require: true },
          precio: { type: Number, require: true },
          avatar: { type: String, require: true },
          codigo: { type: String, require: true },
          stock: { type: Number, require: true },
          descripcion: { type: String, require: true },
        },{ timestamps: true }))
    }
}

export default ProductosDaoMongoDB
