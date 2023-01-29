import { carritosDao, productosDao, usuariosDao } from "../../models/daos/index.js";
import { base_host } from "../../bin/www.js";
import { faker } from "@faker-js/faker/locale/es";

export async function obtenerProductos(username, session) {
  let value = await productosDao.listarAll();
  let userinfo = await usuariosDao.buscar(username);
  let userid = userinfo[0]._id.toString();
  let carritoinfo = await carritosDao.buscar(userid);
  let carritoid = carritoinfo[0]._id.toString();
  const { username2 } = { username: session };
  let data = {
    value,
    username: username2,
    userid: userid,
    carritoid: carritoid,
    isEmpty: !value.length,
    detailUrlBase: `${base_host}/productos`,
    base_url: base_host,
  };
  return data;
}

export async function obtenerProducto(id, session) {
  let data;
  let value = await productosDao.listar(id);
  if (process.env.TIPO_PERSISTENCIA === "mongodb") {
    const producto = value[0];
    data = {
      producto: producto,
      username: session,
      base_url: base_host,
    };
  } else {
    const producto = value;
    data = {
      producto: producto,
      username: session,
      base_url: base_host,
    };
  }
  return data;
}

export async function testProductos(session) {
  function getProducts() {
    const productos = [];
    for (let index = 0; index < 5; index++) {
      productos.push({
        id: index + 1,
        nombre: faker.word.noun(),
        precio: faker.datatype.number({
          min: 100,
          max: 1000,
          precision: 0.01,
        }),
        avatar: faker.image.image(),
      });
    }
    return productos;
  }
  const data = { value: getProducts(), username: session, base_url: base_host };
  return data;
}

export async function visualizadorProductos(session) {
  const productos = await productosDao.listarAll();
  const data = {
    productos,
    username: session,
    isEmpty: !productos.length,
    base_url: base_host,
  };
  return data;
}

export default {
  obtenerProductos,
  obtenerProducto,
  visualizadorProductos,
  testProductos,
};
