import { Router } from "express";
import validatorAdminMiddleware from "../../../middlewares/validator-admin.js";
import logger from "../../../logs/logger.js";
import { actualizarUsuario } from "../../../controllers/api/usuarios.js";

const routeractualizarusuarios = Router();

routeractualizarusuarios.post(
  "/:id/update",
  validatorAdminMiddleware,
  (req, res, next) => {
    try {
      actualizarUsuario(req.params.id,req.body,req.session.username).then((username) =>{
        logger.info(username);
        res.render("menu", username);
      })
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
);

export default routeractualizarusuarios;
