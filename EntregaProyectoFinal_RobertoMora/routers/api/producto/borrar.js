import { Router } from "express";
import validatorAdminMiddleware from "../../../middlewares/validator-admin.js";
import logger from '../../../logs/logger.js'
import { borrarProducto } from "../../../controllers/api/productos.js";
import authorizationJwt from "../../../middlewares/authorization-jwt.js";

const routerborrar = Router();

routerborrar.delete("/:id", authorizationJwt,validatorAdminMiddleware, (req, res, next) => {
  try {
    borrarProducto(req.params.id).then((msg) => {
      logger.info(msg)
      res.json(msg);
      res.status(204).end();
    });
  } catch (error) {
    logger.error(error)
    next(error);
  }
});

export default routerborrar;
