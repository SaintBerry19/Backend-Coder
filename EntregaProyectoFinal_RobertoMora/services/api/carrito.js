import { carritosDao } from "../../models/daos/index.js";
import CarritoDTO from "../../models/dto/carritoDTO.js";

export async function crearCarrito(userid) {
  let userId = { userid: userid};
  let carrito = await carritosDao.guardar(userId);
  let carritoDTO = new CarritoDTO(carrito);
  return carritoDTO;
}

export async function obtenerCarritos(query) {
  let value = await carritosDao.listarAll(query);
  return value.map(carrito=>new CarritoDTO(carrito))
}

export async function obtenerCarrito(id) {
  let value = await carritosDao.listar(id);
  return value.map(carrito=>new CarritoDTO(carrito))
}

export async function actualizarCarrito(array, id) {
    await carritosDao.actualizar(id, array);
    let value = await carritosDao.listar(id);
    let actualizar = new CarritoDTO(value[0]);
    return actualizar;
}

export async function borrarCarrito(id) {
  await carritosDao.borrar(id);
  let msg = { mensaje: "Se borro el carrito con exito" };
  return msg;
}

export default {
  crearCarrito,
  obtenerCarritos,
  obtenerCarrito,
  actualizarCarrito,
  borrarCarrito,
};
