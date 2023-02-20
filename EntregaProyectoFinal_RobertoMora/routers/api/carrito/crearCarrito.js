import { Router } from "express";
import { crearCarrito } from "../../../controllers/api/carrito.js";
import logger from "../../../logs/logger.js";
import authorizationJwt from "../../../middlewares/authorization-jwt.js";

const routercrearcarrito = Router();

routercrearcarrito.post("/:userid", authorizationJwt,(req, res, next) => {
  try {
    crearCarrito(req.params.userid).then((carrito) => {
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
