import { carritosDao, usuariosDao ,productosDao} from "../../models/daos/index.js";
import { base_host } from "../../bin/www.js";
import { sms } from "../../twilio.js";
import { whatsapptext } from "../../whatsapp.js";
import sendMail from "../../gmail.js";
import CarritoDTO from "../../models/dto/carritoDTO.js";

export async function actualizarCarrito(array, id, username) {
  let data = JSON.parse(array);
  let listaProductos = [];
  for await (let object of data) {
    let producto = await productosDao.listar(object.id);
    producto[0].cantidad = object.cantidad;
    producto[0].subtotal = producto[0].cantidad * producto[0].precio;
    listaProductos.push(producto[0]);
  }
  let carrito = await carritosDao.listar(id);
  carrito = carrito[0];
  if (carrito.productos.length > 0) {
    let listanueva = [];
    for (let productonuevo of listaProductos) {
      let i = false;
      for (let producto of carrito.productos) {
        if (producto._id.toString() === productonuevo._id.toString()) {
          producto.cantidad = producto.cantidad + productonuevo.cantidad;
          producto.subtotal = producto.cantidad * producto.precio;
          listanueva.push(producto);
          i = true;
        }
      }
      if (!i) {
        listanueva.push(productonuevo);
      }
    }
    for (let productoviejo of carrito.productos) {
      let e = false;
      for (let agregado of listanueva) {
        if (agregado._id.toString() === productoviejo._id.toString()) {
          e = true;
        }
      }
      if (!e) {
        listanueva.push(productoviejo);
      }
    }
    let data = { productos: listanueva };
    let newCarrito = await carritosDao.actualizar(id, data);
    let actualizar = new CarritoDTO(newCarrito);
    let value = await usuariosDao.buscar(username);
    let avatar = value[0].avatar;
    const username2 = {
      username: {
        username: username,
        base_url: base_host,
        avatar: avatar,
      },
    };
    let result = { actualizar: actualizar, username: username2 };
    return result;
  } else {
    let data = { productos: listaProductos };
    let newCarrito = await carritosDao.actualizar(id, data);
    let actualizar = new CarritoDTO(newCarrito);
    let value = await usuariosDao.buscar(username);
    let avatar = value[0].avatar;
    const username2 = {
      username: {
        username: username,
        base_url: base_host,
        avatar: avatar,
      },
    };
    let result = { actualizar: actualizar, username: username2 };
    return result;
  }
}

export async function removerCarrito(idcarrito, idproducto, username) {
  let carrito = await carritosDao.listar(idcarrito);
  let result = carrito[0].productos.filter(
    (producto) => producto._id.toString() !== idproducto
  );
  let data = { productos: result };
  let newCarrito = await carritosDao.actualizar(idcarrito, data);
  let actualizar = new CarritoDTO(newCarrito);
  let value = await usuariosDao.buscar(username);
  let avatar = value[0].avatar;
  const username2 = {
    username: {
      username: username,
      base_url: base_host,
      avatar: avatar,
    },
  };
  let cambio = {
    username: username2,
    actualizar: actualizar,
  };
  return cambio;
}

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

export default {
  obtenerCarrito,
  vaciarCarrito,
  comprarCarrito,
  actualizarCarrito,
  removerCarrito
}