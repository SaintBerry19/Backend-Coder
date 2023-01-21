import productosServices from "../../services/views/productos.js";

export async function obtenerProductos(username, session) {
  let data = await productosServices.obtenerProductos(username, session);
  return data;
}

export async function obtenerProducto(id, session) {
  let data = await productosServices.obtenerProducto(id, session);
  return data;
}

export async function testProductos(session) {
  let result = await productosServices.testProductos(session);
  return result;
}

export async function visualizadorProductos(session) {
  let result = await productosServices.visualizadorProductos(session);
  return result;
}

export default {
  obtenerProductos,
  obtenerProducto,
  visualizadorProductos,
  testProductos,
};
