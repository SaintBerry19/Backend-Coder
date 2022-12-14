import { Router } from "express";
import { crearCarrito } from "../../../controllers/api/carrito.js";
import { carritosDao } from "../../../daos/index.js";
import logger from "../../../logs/logger.js";

const routercrearcarrito = Router();

routercrearcarrito.post("/", (req, res, next) => {
  try {
    crearCarrito().then((carrito) => {
      logger.info(carrito);
      res.json(carrito);
      res.status(204).end();
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default routercrearcarrito;
