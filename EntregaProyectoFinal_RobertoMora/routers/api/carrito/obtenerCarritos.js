import { Router } from "express";
import logger from '../../../logs/logger.js'
import { obtenerCarrito,obtenerCarritos } from "../../../controllers/api/carrito.js";
import authorizationJwt from "../../../middlewares/authorization-jwt.js";


const routerobtenercarrito = Router();

routerobtenercarrito.get("/", authorizationJwt,(req, res, next) => {
  try {
    obtenerCarritos(req.query).then((value) => {
      logger.info(value)
      res.json(value);
    });
  } catch (error) {
    logger.error(error)
    next(error);
  }
});

routerobtenercarrito.get("/:id",authorizationJwt, (req, res, next) => {
  try {
    obtenerCarrito(req.params.id).then((value) => {
      logger.info(value)
      res.json(value);
    });
  } catch (error) {
    logger.error(error)
    next(error);
  }
});

export default routerobtenercarrito;
