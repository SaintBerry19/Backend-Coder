import { Router } from "express";
import validatorAdminMiddleware from "../../../middlewares/validator-admin.js";
import logger from "../../../logs/logger.js";
import { actualizarUsuario } from "../../../controllers/api/usuarios.js";
import authorizationJwt from "../../../middlewares/authorization-jwt.js";

const routeractualizarusuarios = Router();

routeractualizarusuarios.put(
  "/:id",
  validatorAdminMiddleware,authorizationJwt,
  (req, res, next) => {
    try {
      actualizarUsuario(req.params.id,req.body,req.session.username).then((username) =>{
        logger.info(username);
        res.json(username);
      })
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
);

export default routeractualizarusuarios;
