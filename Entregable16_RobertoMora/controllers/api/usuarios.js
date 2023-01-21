import usuariosServices from "../../services/api/usuarios.js";

export async function crearUsuario(body) {
  let data = await usuariosServices.crearUsuario(body);
  return data;
}

export async function obtenerUsuarios() {
  let value = await usuariosServices.obtenerUsuarios();
  return value;
}
export async function obtenerUsuario(id) {
  let value = await usuariosServices.obtenerUsuario(id);
  return value;
}

export async function borrarUsuario(id) {
  let msg = await usuariosServices.borrarUsuario(id);
  return msg;
}

export async function actualizarUsuario(id, data, username) {
  let value = await usuariosServices.actualizarUsuario(id, data, username);
  return value;
}

export default {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  borrarUsuario
}