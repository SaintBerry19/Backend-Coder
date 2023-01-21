import productosServices from "../../services/api/productos.js";

export async function crearProductos(body) {
  let data= await productosServices.crearProductos(body);
  return data;
}

export async function obtenerProductos() {
    let value= await productosServices.obtenerProductos();
    return value
}

export async function obtenerProducto(id) {
    let value= await productosServices.obtenerProducto(id);
    return value
}

export async function actualizarProducto(id,body){
    let value= await productosServices.actualizarProducto(id,body)
    return value
}

export async function borrarProducto(id){
   let msg= await productosServices.borrarProducto(id)
    return msg
}

export default {
    crearProductos,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}