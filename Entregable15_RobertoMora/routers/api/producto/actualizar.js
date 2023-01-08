import { Router } from "express";
import { productosDao } from "../../../daos/index.js";
import validatorAdminMiddleware from "../../../middlewares/validator-admin.js";
import logger from '../../../logs/logger.js'


const routeractualizar = Router();

routeractualizar.put(
  "/:id",
  validatorAdminMiddleware,
  (req, res, next) => {
    try {
      productosDao
        .actualizar(req.params.id, req.body)
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

export default routeractualizar;
