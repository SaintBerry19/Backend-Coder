import { productosDao } from "../../daos/index.js";

export async function crearProductos(body) {
  await productosDao.guardar(body);
  const data = { mensaje: "Actualizacion: Producto ingresado con exito" };
  return data;
}

export async function obtenerProductos() {
    let value= await productosDao.listarAll()
    return value
}

export async function obtenerProducto(id) {
    let value= await productosDao.listar(id)
    return value
}

export async function actualizarProducto(id,body){
    let value= productosDao.actualizar(id,body)
    return value
}

export async function borrarProducto(id){
    await productosDao.borrar(id)
    let msg= { mensaje: "Se elimino de manera correcta el producto" }
    return msg
}