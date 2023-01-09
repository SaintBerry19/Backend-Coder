import { Router } from "express";
import logger from '../../../logs/logger.js'
import { obtenerCarrito,obtenerCarritos } from "../../../controllers/api/carrito.js";


const routerobtenercarrito = Router();

routerobtenercarrito.get("/", (req, res, next) => {
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

routerobtenercarrito.get("/:id/carritos", (req, res, next) => {
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
