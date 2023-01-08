import { Schema } from 'mongoose'
import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js"

class UsuariosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super('Usuarios', new Schema({
            fistname: { type: String, require: true },
            lastname: { type: String, require: true },
            username:{ type: String, unique: true },
            password:{ type: String, require: true },
            age: { type: Number, require: true },
            phone: { type: String, require: true },
            avatar:{ type: String, require: true },
            email: { type: String, require: true, unique: true, index: true, validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ },
            status: { type: String, default: 'active', enum: ['active', 'inactive'] },
          }, { timestamps: true }))
    }
    async buscar(username) {
        const result= await this.collection.find({username:username}).lean()
        return result
      }
}

export default UsuariosDaoMongoDB
