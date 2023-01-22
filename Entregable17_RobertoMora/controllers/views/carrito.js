import carritoServices from "../../services/views/carrito.js";


export async function obtenerCarrito(username, session) {
let data= await carritoServices.obtenerCarrito(username, session);
return data
}

export async function vaciarCarrito(username) {
  let result =await carritoServices.vaciarCarrito(username);
  return result;
}

export async function comprarCarrito(username) {
  let result = await carritoServices.comprarCarrito(username);
  return result;
}

export default {
  obtenerCarrito,
  vaciarCarrito,
  comprarCarrito
}