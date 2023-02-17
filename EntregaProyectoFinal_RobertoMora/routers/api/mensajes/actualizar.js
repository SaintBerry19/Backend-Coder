import { Router } from "express";
import validatorAdminMiddleware from "../../../middlewares/validator-admin.js";
import logger from "../../../logs/logger.js";
import { actualizarMensaje } from "../../../controllers/api/mensajes.js";
import authorizationJwt from "../../../middlewares/authorization-jwt.js";

const routeractualizarmensajes = Router();

routeractualizarmensajes.put(
  "/:id",
  validatorAdminMiddleware,authorizationJwt,
  (req, res, next) => {
    try {
      actualizarMensaje(req.params.id,req.body).then((value) => {
        logger.info(value);
        res.json(value);
        res.status(204).end();
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
);

export default routeractualizarmensajes;
