import { Router } from "express";
import validatorAdminMiddleware from "../../../middlewares/validator-admin.js";
import logger from "../../../logs/logger.js";
import { actualizarProducto } from "../../../controllers/api/productos.js";
import authorizationJwt from "../../../middlewares/authorization-jwt.js";

const routeractualizar = Router();

routeractualizar.put("/:id",authorizationJwt, validatorAdminMiddleware, (req, res, next) => {
  try {
    actualizarProducto(req.params.id, req.body).then((value) => {
      logger.info(value);
      res.json(value);
      res.status(204).end();
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default routeractualizar;
