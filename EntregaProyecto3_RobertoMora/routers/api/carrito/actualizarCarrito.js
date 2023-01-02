import { Router } from "express";
import { carritosDao } from "../../../daos/index.js";
import { productosDao,usuariosDao } from "../../../daos/index.js";
import logger from "../../../logs/logger.js";
import { base_host } from "../../../bin/www.js";


const routeractualizarcarrito = Router();

routeractualizarcarrito.post("/:id/update", (req, res, next) => {
  try {
    let data = JSON.parse(req.body.array);
    let productos = data.map(async (object) => {
      let producto = await productosDao.listar(object.id);
      producto[0].cantidad = object.cantidad;
      producto[0].subtotal = producto[0].cantidad*producto[0].precio;
      return producto[0];
    });
    Promise.all(productos).then((listaProductos) => {
      carritosDao.listar(req.params.id).then((carrito) => {
        let listanueva=[]
        for (let producto of carrito[0].productos){
          for (let productonuevo of listaProductos){
            if(producto._id.toString()===productonuevo._id.toString()){
              producto.cantidad=producto.cantidad+productonuevo.cantidad;
              producto.subtotal=producto.cantidad*producto.precio
              listanueva.push(producto);
            } else{
                listanueva.push(productonuevo)
              }
          }
        }
        let data = {productos: listanueva}
        carritosDao
          .actualizar(req.params.id, data)
          .then((actualizar) => {
            usuariosDao.buscar(req.session.username).then((value) => {
              let avatar = value[0].avatar;
              const username = {
                username: {
                  username: req.session.username,
                  base_url: base_host,
                  avatar: avatar,
                },
              };
              logger.info(actualizar);
              res.render("menu", username);
            });
          });
      })
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default routeractualizarcarrito;
