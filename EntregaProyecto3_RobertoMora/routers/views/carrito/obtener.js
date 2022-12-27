import { Router } from "express";
import { carritosDao, productosDao } from "../../../daos/index.js";
import { usuariosDao } from "../../../daos/index.js";
import auth from "../../../middlewares/authorization.js";
import { base_host } from "../../../bin/www.js";
import logger from "../../../logs/logger.js";

const obtener = Router();

obtener.get("/carrito/", auth, (req, res, next) => {
  try {
    

  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default obtener;
