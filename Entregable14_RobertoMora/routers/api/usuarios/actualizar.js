import { Router } from "express";
import { productosDao } from "../../../daos/index.js";
import validatorAdminMiddleware from "../../../middlewares/validator-admin.js";
import logger from '../../../logs/logger.js'


const routeractualizarusuarios = Router();

routeractualizarusuarios.put(
  "/:id/:method",
  validatorAdminMiddleware,
  (req, res, next) => {
    try {
      productosDao
        .actualizar(req.params.id, req.params.method, req.body)
        .then((value) => {
          logger.info(value)
          res.json(value)
          res.status(204).end()
        });
    } catch (error) {
      logger.error(error)
      next(error);
    }
  }
);

export default routeractualizarusuarios;
