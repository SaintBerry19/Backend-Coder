import { productosDao } from "../../models/daos/index.js";
import ProductsDTO from "../../models/dto/productosDTO.js";

export async function crearProductos(body) {
  let producto=await productosDao.guardar(body);
  const data = {product:producto, mensaje: "Actualizacion: Producto ingresado con exito" };
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
    await productosDao.actualizar(id,body)
    let product = await productosDao.listar(id)
    product=product[0]
    return new ProductsDTO(product)
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