import { Router } from "express";
import logger from "../../../logs/logger.js";
import {
  actualizarCarrito,
  removerCarrito,
} from "../../../controllers/api/carrito.js";
import authorizationJwt from "../../../middlewares/authorization-jwt.js";

const routeractualizarcarrito = Router();

routeractualizarcarrito.post("/:id/remove/:idproducto", authorizationJwt,(req, res, next) => {
  try {
    removerCarrito(
      req.params.id,
      req.params.idproducto,
      req.session.username
    ).then((data) => {
      logger.info(data.actualizar);
      res.json(data.actualizar);
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

routeractualizarcarrito.post("/:id/update", authorizationJwt,(req, res, next) => {
  try {
    actualizarCarrito(req.body.array, req.params.id, req.session.username).then(
      (data) => {
        logger.info(data.actualizar);
        res.json(data.actualizar);
      }
    );
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default routeractualizarcarrito;
