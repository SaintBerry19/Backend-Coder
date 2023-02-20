import carritoServices from "../../services/views/carrito.js";

export async function obtenerCarrito(username, session) {
  let data = await carritoServices.obtenerCarrito(username, session);
  return data;
}

export async function vaciarCarrito(username) {
  let result = await carritoServices.vaciarCarrito(username);
  return result;
}

export async function comprarCarrito(username) {
  let result = await carritoServices.comprarCarrito(username);
  return result;
}

export async function actualizarCarrito(array, id, username) {
  let value = await carritoServices.actualizarCarrito(array, id, username);
  return value;
}

export async function removerCarrito(array, id, username) {
  let value = await carritoServices.removerCarrito(array, id, username);
  return value;
}

export default {
  obtenerCarrito,
  vaciarCarrito,
  comprarCarrito,
  actualizarCarrito,
  removerCarrito
};
