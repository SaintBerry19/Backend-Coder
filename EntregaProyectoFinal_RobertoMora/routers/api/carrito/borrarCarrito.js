import { Router } from "express";
import logger from "../../../logs/logger.js";
import { borrarCarrito } from "../../../controllers/api/carrito.js";
import authorizationJwt from "../../../middlewares/authorization-jwt.js";

const routerborrarcarrito = Router();

routerborrarcarrito.delete("/:id", authorizationJwt,(req, res, next) => {
  try {
    borrarCarrito(req.params.id).then((msg) => {
      logger.info(msg);
      res.json(msg);
      res.status(204).end();
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default routerborrarcarrito;
