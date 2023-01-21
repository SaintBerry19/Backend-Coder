import { mensajesDao } from "../../models/daos/index.js"
import MensajeDTO from "../../models/dto/messagesDTO.js";


export async function crearMensaje(body){
 await mensajesDao.guardar(body)
 const data = {mensaje: 'Actualizacion: Mensaje ingresado con exito'}
 return data
}

export async function obtenerMensajes(){
    let value = await mensajesDao.listarAll()
    return value.map(mensaje=>new MensajeDTO(mensaje))
}
export async function obtenerMensaje(id){
    let value = await mensajesDao.listar(id)
    return value.map(mensaje=>new MensajeDTO(mensaje))
}

export async function borrarMensaje(id){
    await mensajesDao.borrar(id)
    let msg={ mensaje: "Se elimino de manera correcta el mensaje" }
    return msg
}

export async function actualizarMensaje(id,body){
    let value =await mensajesDao.actualizar(id,body)
    return new MensajeDTO(value)
}

export default{
    crearMensaje,
    obtenerMensaje,
    obtenerMensajes,
    borrarMensaje,
    actualizarMensaje
}