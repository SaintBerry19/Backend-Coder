import { Router } from "express";
import auth from "../../../middlewares/authorization.js";
import logger from "../../../logs/logger.js";
import {
  obtenerCarrito,
  vaciarCarrito,
  comprarCarrito,
} from "../../../controllers/views/carrito.js";

const carrito = Router();

carrito.get("/carrito/", auth, (req, res, next) => {
  try {
    obtenerCarrito(req.session.username, req.session).then((result) => {
      logger.info(result);
      res.render("carrito", result);
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

carrito.post("/carrito/vaciar", auth, (req, res, next) => {
  try {
    vaciarCarrito(req.session.username).then((result) => {
      logger.info(result.carrito);
      res.render("menu", result.username);
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

carrito.post("/carrito/comprar", auth, (req, res, next) => {
  try {
    comprarCarrito(req.session.username).then((result) => {
      logger.info(result.carrito);
      res.render("menu", result.username);
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default carrito;
