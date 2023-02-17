import { Router } from "express";
import validatorAdminMiddleware from "../../../middlewares/validator-admin.js";
import logger from "../../../logs/logger.js";
import { crearMensaje } from "../../../controllers/api/mensajes.js";
import authorizationJwt from "../../../middlewares/authorization-jwt.js";

const routercrearmensajes = Router();

routercrearmensajes.post("/", authorizationJwt,validatorAdminMiddleware, (req, res, next) => {
  try {
    crearMensaje(req.body).then((data) => {
      logger.info(data);
      res.json(data);
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default routercrearmensajes;
