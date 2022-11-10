import { Schema } from 'mongoose'
import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js"

class MensajesDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super('Mensajes', new Schema({
          author: {
            id: { type: String, require: true },
            nombre: { type: String, require: true },
            apellido: { type: String, require: true },
            edad: { type: Number, require: true },
            alias: { type: String, require: true },
            avatar: { type: String, require: true },
          },
          message: { type: String, require: true },
        },{ timestamps: true }))
    }
}

export default MensajesDaoMongoDB
