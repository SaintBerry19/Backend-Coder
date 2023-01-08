import { Router } from "express";
import auth from "../../../middlewares/authorization.js";
import logger from "../../../logs/logger.js";
import {
  obtenerProductos,
  obtenerProducto,
} from "../../../controllers/views/productos.js";

const obtener = Router();

obtener.get("/productos/", auth, (req, res, next) => {
  try {
    obtenerProductos(req.session.username, req.session).then((productos) => {
      logger.info(productos);
      res.render("productos", productos);
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

obtener.get("/productos/:id", auth, (req, res, next) => {
  try {
    obtenerProducto(req.params.id, req.session).then((productos) => {
      logger.info(productos);
      res.render("producto", productos);
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default obtener;
