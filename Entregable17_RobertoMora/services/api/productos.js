import { productosDao } from "../../models/daos/index.js";
import ProductsDTO from "../../models/dto/productosDTO.js";

export async function crearProductos(body) {
  await productosDao.guardar(body);
  const data = { mensaje: "Actualizacion: Producto ingresado con exito" };
  return data;
}

export async function obtenerProductos() {
    let value= await productosDao.listarAll()
    return value.map((producto)=> new ProductsDTO(producto));
}

export async function obtenerProducto(id) {
    let value= await productosDao.listar(id)
    return value.map((producto)=> new ProductsDTO(producto));
}

export async function actualizarProducto(id,body){
    let value= await productosDao.actualizar(id,body)
    return new ProductsDTO(value);
}

export async function borrarProducto(id){
    await productosDao.borrar(id)
    let msg= { mensaje: "Se elimino de manera correcta el producto" }
    return msg
}

export default {
    crearProductos,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}