import { Router } from "express";
import validatorAdminMiddleware from "../../../middlewares/validator-admin.js";
import logger from '../../../logs/logger.js'
import { borrarUsuario } from "../../../controllers/api/usuarios.js";
import authorizationJwt from "../../../middlewares/authorization-jwt.js";

const routerborrarusuarios = Router();

routerborrarusuarios.delete("/:id",authorizationJwt, validatorAdminMiddleware, (req, res, next) => {
  try {
    borrarUsuario(req.params.id).then((msg) => {
      logger.info(msg)
      res.json(msg);
      res.status(204).end();
    });
  } catch (error) {
    logger.error(error)
    next(error);
  }
});

export default routerborrarusuarios;
