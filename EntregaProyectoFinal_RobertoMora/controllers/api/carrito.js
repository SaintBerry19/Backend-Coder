import carritoServices from "../../services/api/carrito.js";

export async function crearCarrito(userid) {
  let carrito = carritoServices.crearCarrito(userid);
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

export async function actualizarCarrito(array, id) {
 let value = await carritoServices.actualizarCarrito(array, id);
 return value;
}

export async function borrarCarrito(id) {
  await  carritoServices.borrarCarrito(id);
  let msg= {mensaje:'Se borro el carrito con exito'}
  return msg;
}

export default {
  crearCarrito,
  obtenerCarritos,
  obtenerCarrito,
  actualizarCarrito,
  borrarCarrito,
};
