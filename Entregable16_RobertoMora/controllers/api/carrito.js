import { carritosDao, productosDao, usuariosDao } from "../../daos/index.js";
import { base_host } from "../../bin/www.js";

export async function crearCarrito() {
  let carrito = carritosDao.guardar();
  return carrito;
}

export async function obtenerCarritos(query) {
  let value = carritosDao.listarAll(query);
  return value;
}

export async function obtenerCarrito(id) {
  let value = carritosDao.listar(id);
  return value;
}

export async function actualizarCarrito(array, id, username) {
  let data = JSON.parse(array);
  let listaProductos =[]
  for await (let object of data){
    let producto = await productosDao.listar(object.id);
    producto[0].cantidad = object.cantidad;
    producto[0].subtotal = producto[0].cantidad * producto[0].precio;
    listaProductos.push(producto[0]);
  }
    let carrito = await carritosDao.listar(id);
    carrito=carrito[0]
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
        let e =false
        for(let agregado of listanueva){
          if (agregado._id.toString() === productoviejo._id.toString()){
            e=true 
          }
        }
        if (!e) {
          listanueva.push(productoviejo);
        }
      }
      let data = { productos: listanueva };
      let actualizar = await carritosDao.actualizar(id, data);
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
    }else{
         let data = { productos: listaProductos };
         let actualizar = await carritosDao.actualizar(id, data);
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
  let actualizar = await carritosDao.actualizar(idcarrito, data);
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

export async function borrarCarrito(id) {
  await carritosDao.borrar(id);
  let msg= {mensaje:'Se borro el carrito con exito'}
  return msg;
}