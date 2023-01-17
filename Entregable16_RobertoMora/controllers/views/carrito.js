import { carritosDao, productosDao, usuariosDao } from "../../daos/index.js";
import { base_host } from "../../bin/www.js";
import { sms } from "../../twilio.js";
import { whatsapptext } from "../../whatsapp.js";
import sendMail from "../../gmail.js";

export async function obtenerCarrito(username, session) {
  let userinfo = await usuariosDao.buscar(username);
  let userid = userinfo[0]._id.toString();
  let avatar = userinfo[0].avatar;
  let carritoinfo = await carritosDao.buscar(userid);
  let carritoid = carritoinfo[0]._id.toString();
  let value = carritoinfo[0].productos;
  let total = 0;
  for (let product of value) {
    total = total + product.subtotal;
  }
  const { username2 } = { username: session };
  const data = {
    value,
    avatar: avatar,
    username: username2,
    userid: userid,
    carritoid: carritoid,
    isEmpty: !value.length,
    detailUrlBase: `${base_host}/productos`,
    base_url: base_host,
    total: total,
  };
  return data;
}

export async function vaciarCarrito(username) {
  let userinfo = await usuariosDao.buscar(username);
  let userid = userinfo[0]._id.toString();
  let avatar = userinfo[0].avatar;
  let carritoinfo = await carritosDao.buscar(userid);
  let carritoid = carritoinfo[0]._id.toString();
  let productos = [];
  let data = { productos: productos };
  let actualizar = await carritosDao.actualizar(carritoid, data);
  let username2 = {
    username: {
      username: username,
      base_url: base_host,
      avatar: avatar,
      mensaje: "Se vacio el carrito con exito!",
    },
  };
  let result = {
    username: username2,
    carrito: actualizar,
  };
  return result;
}

export async function comprarCarrito(username) {
  let userinfo = await usuariosDao.buscar(username);
  let userid = userinfo[0]._id.toString();
  let avatar = userinfo[0].avatar;
  let telefono = userinfo[0].phone;
  let whatsapp = `whatsapp:+521${telefono.toString()}`;
  let email = userinfo[0].email;
  telefono = `+52${telefono.toString()}`;
  let carritoinfo = await carritosDao.buscar(userid);
  let carritoid = carritoinfo[0]._id.toString();
  let productos = [];
  let data = { productos: productos };
  let actualizar = await carritosDao.actualizar(carritoid, data);
  let username2 = {
    username: {
      username: username,
      base_url: base_host,
      avatar: avatar,
      mensaje: "Se realizo la compra con exito!",
    },
  };
  await sendMail(email, carritoinfo[0].productos);
  sms(telefono).then(() => {
    whatsapptext(whatsapp, email, carritoinfo[0].productos);
  });
  let result = {
    username: username2,
    carrito: actualizar,
  };
  return result;
}
