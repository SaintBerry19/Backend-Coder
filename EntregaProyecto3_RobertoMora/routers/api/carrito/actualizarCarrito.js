import { Router } from "express";
import { carritosDao } from "../../../daos/index.js";
import { productosDao } from "../../../daos/index.js";
import logger from "../../../logs/logger.js";

const routeractualizarcarrito = Router();

routeractualizarcarrito.post("/:id/update", (req, res, next) => {
  try {
    let data = JSON.parse(req.body.array);
    let productos = data.map(async (object) => {
      let producto = await productosDao.listar(object.id);
      producto[0].cantidad = object.cantidad;
      return producto[0];
    });
    Promise.all(productos).then((listaProductos) => {
      let data = {productos: listaProductos}
      carritosDao
        .actualizar(req.params.id, data)
        .then((actualizar) => {
          console.log(actualizar);
          let msg = { mensaje: "Se actualizo el carrito" };
          logger.info(msg);
          res.json(msg);
          res.status(204).end();
        });
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default routeractualizarcarrito;
