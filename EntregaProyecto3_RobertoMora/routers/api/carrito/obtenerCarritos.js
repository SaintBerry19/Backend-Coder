import { Router } from "express";
import { carritosDao } from "../../../daos/index.js";
import logger from '../../../logs/logger.js'


const routerobtenercarrito = Router();

routerobtenercarrito.get("/", (req, res, next) => {
  try {
    carritosDao.listarAll(req.query).then((value) => {
      logger.info(value)
      res.json(value);
    });
  } catch (error) {
    logger.error(error)
    next(error);
  }
});

routerobtenercarrito.get("/:id/productos", (req, res, next) => {
  try {
    carritosDao.listar(req.params.id).then((value) => {
      logger.info(value)
      res.json(value);
    });
  } catch (error) {
    logger.error(error)
    next(error);
  }
});

export default routerobtenercarrito;
