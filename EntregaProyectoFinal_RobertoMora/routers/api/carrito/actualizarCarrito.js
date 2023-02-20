import { Router } from "express";
import logger from "../../../logs/logger.js";
import { actualizarCarrito } from "../../../controllers/api/carrito.js";
import authorizationJwt from "../../../middlewares/authorization-jwt.js";

const routeractualizarcarrito = Router();

routeractualizarcarrito.put(
  "/:id",
  authorizationJwt,
  (req, res, next) => {
    try {
      actualizarCarrito(
        req.body,
        req.params.id
      ).then((data) => {
        logger.info(data);
        res.json(data);
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
);

export default routeractualizarcarrito;
