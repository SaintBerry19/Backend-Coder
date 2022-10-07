const ObjectId = require("mongodb").ObjectId;
const filter = require("lodash/filter");
const find = require("lodash/find");
const remove = require("lodash/remove");
const BD = require("../db/index");
const { NotFoundError } = require("../utils/errores");

let carritos = [];

function crearCarrito() {
  const _id = new ObjectId();
  const create_time = new Date();
  carritos.push({ _id: _id, time: create_time, productos: [] });
  return { insertedId: _id };
}
function obtenerCarritos(query = {}) {
  const criterio = {};
  if (query.precio) {
    criterio.precio = query.precio;
  }
  if (query.nombre) {
    criterio.nombre = query.nombre;
  }
  return filter(carritos, (carrito) => {
    let status = true;
    if (query.precio || query.nombre) {
      status = false;
    }
    if (
      (query.precio && query.precio === carrito.precio) ||
      (query.nombre && query.nombre === carrito.nombre)
    ) {
      status = true;
    }
    return status;
  });
}

function obtenerCarritoPorId(idCarrito) {
  const carrito = find(
    carritos,
    (carrito) => String(carrito._id) === String(idCarrito)
  );
  if (!carrito) {
    throw new NotFoundError(`Carrito con id ${idCarrito} no encontrado.`);
  }
  return carrito;
}

function argregarProductoId(idCarrito, idProducto) {
  let flag = false;
  const carrito = obtenerCarritoPorId(idCarrito);
  if (carrito !== {}) {
    let producto = BD.obtenerPorId(idProducto);
    if (producto !== {}) {
      carrito.productos.map((item, index) => {
        if (item._id === idProducto) {
          carrito.productos[index] = {
            ...carrito.productos[index],
            contador: item.contador + 1,
          };
          flag = true;
        }
      });
      if (!flag) {
        carrito.productos.push({ ...producto, contador: 1 });
      }
      return { insertedIdCarrito: carrito._id, insertedId: producto._id };
    } else {
      throw new NotFoundError(`Producto con id ${idProducto} no encontrado.`);
    }
  } else {
    throw new NotFoundError(`Carrito con id ${idCarrito} no encontrado.`);
  }
}

function borrarCarritoId(idCarrito) {
  const carrito = obtenerCarritoPorId(idCarrito);
  remove(carritos, (carrito) => String(carrito._id) === String(idCarrito));
  return carrito;
}

function borrarPorIdCarrito(idCarrito, idProducto) {
  const carrito = obtenerCarritoPorId(idCarrito);
  if (carrito !== {}) {
    let producto = BD.obtenerPorId(idProducto);
    if (producto !== {}) {
      carrito.productos.map((item, index) => {
        if (item._id === idProducto) {
          carrito.productos[index] = {
            ...carrito.productos[index],
            contador: item.contador - 1,
          };
          if (carrito.productos[index].contador === 0) {
            remove(
              carrito.productos,
              (producto) => String(producto._id) === String(idProducto)
            );
            return producto;
          }
        }
      });
      return { insertedIdCarrito: carrito._id, insertedId: producto._id };
    } else {
      throw new NotFoundError(`Producto con id ${idProducto} no encontrado.`);
    }
  } else {
    throw new NotFoundError(`Carrito con id ${idCarrito} no encontrado.`);
  }
}

module.exports = {
  crearCarrito,
  obtenerCarritos,
  borrarCarritoId,
  argregarProductoId,
  borrarPorIdCarrito,
  obtenerCarritoPorId,
};
