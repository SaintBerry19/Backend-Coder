import carritoServices from "../../services/api/carrito.js";

export async function crearCarrito() {
  let carrito = carritoServices.crearCarrito;
  return carrito;
}

export async function obtenerCarritos(query) {
  let value = await carritoServices.obtenerCarritos(query);
  return value;
}

export async function obtenerCarrito(id) {
  let value = await carritoServices.obtenerCarrito(id);
  return value;
}

export async function actualizarCarrito(array, id, username) {
 let value = await carritoServices.actualizarCarrito(array, id, username);
 return value;
}

export async function removerCarrito(idcarrito, idproducto, username) {
  let value = await carritoServices.removerCarrito(idcarrito, idproducto, username);
  return value;
 }

export async function borrarCarrito(id) {
  await carritosDao.borrar(id);
  let msg= {mensaje:'Se borro el carrito con exito'}
  return msg;
}

export default {
  crearCarrito,
  obtenerCarritos,
  obtenerCarrito,
  actualizarCarrito,
  borrarCarrito,
  removerCarrito,
};
