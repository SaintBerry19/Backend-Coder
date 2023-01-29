import { carritosDao,usuariosDao } from "../../models/daos/index.js";
import { base_host } from "../../bin/www.js";
import { encryptPassword } from "../../utils.js";
import sendMail from "../../mails.js";
import UserDTO from "../../models/dto/userDTO.js";

export async function crearUsuario(body) {
  let value = await usuariosDao.buscar(body.username);
  if (value.length > 0) {
    const data = {
      mensaje: "Username ya utilizado",
      base_url: base_host,
      autorizado: false,
    };
    return data;
  } else {
    const newUser = {
      ...body,
      password: encryptPassword(body.password),
    };
    let value = await usuariosDao.guardar(newUser);
    let usuario = new UserDTO(value);
    let userid = { userid: usuario._id.toString() };
    const data = {
      mensaje:
        "Actualizacion: Usuario ingresado con exito, puede iniciar sesion",
      base_url: base_host,
      autorizado: true,
    };
    await carritosDao.guardar(userid);
    sendMail(newUser);
    return data;
  }
}

export async function obtenerUsuarios() {
  let value = await usuariosDao.listarAll();
  return value.map((usuario) => new UserDTO(usuario));
}
export async function obtenerUsuario(id) {
  let value = await usuariosDao.listar(id);
  return value.map((usuario) => new UserDTO(usuario));
}

export async function borrarUsuario(id) {
  await usuariosDao.borrar(id);
  let msg = { mensaje: "Se elimino de manera correcta el producto" };
  return msg;
}

export async function actualizarUsuario(id, data, username) {
  let body = { ...data, password: encryptPassword(data.password) };
  await usuariosDao.actualizar(id, body);
  let value = await usuariosDao.buscar(username);
  let avatar = value[0].avatar;
  const username2 = {
    username: {
      username: req.session.username,
      base_url: base_host,
      avatar: avatar,
    },
  };
  return username2;
}

export default {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  borrarUsuario
}