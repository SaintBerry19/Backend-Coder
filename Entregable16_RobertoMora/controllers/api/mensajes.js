import  mensajesServices  from "../../services/api/mensajes.js"

export async function crearMensaje(body){
let value = await mensajesServices.crearMensaje(body)
return value
}

export async function obtenerMensajes(){
    let value = await mensajesServices.obtenerMensajes()
    return value
}
export async function obtenerMensaje(id){
    let value = await mensajesServices.obtenerMensaje(id)
    return value
}

export async function borrarMensaje(id){
    let msg=await mensajesServices.borrarMensaje(id)
    return msg
}

export async function actualizarMensaje(id,body){
    let value =await mensajesServices.actualizarMensaje(id,body)
    return value
}

export default{
    crearMensaje,
    obtenerMensaje,
    obtenerMensajes,
    borrarMensaje,
    actualizarMensaje
}