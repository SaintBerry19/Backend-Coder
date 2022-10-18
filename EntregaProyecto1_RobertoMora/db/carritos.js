import remove from "lodash/remove.js";
import * as BD from "../db/index.js";
import {ObjectId} from 'mongodb'
import filter from 'lodash/filter.js'
import find from 'lodash/find.js'
import {NotFoundError} from '../utils/errores.js'

let carritos = [];

function crearCarrito() {
  const _id = new ObjectId();
  const create_time = new Date();
  const update_time = new Date();
  carritos.push({
    _id: _id,
    create_time: create_time,
    update_time: update_time,
    productos: [],
  });
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
          let contador = item.contador
          carrito.productos[index] = producto
          carrito.productos[index].contador= contador+1
          flag = true;
          carrito.update_time = new Date()
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

export {
  crearCarrito,
  obtenerCarritos,
  borrarCarritoId,
  argregarProductoId,
  borrarPorIdCarrito,
  obtenerCarritoPorId,
};
