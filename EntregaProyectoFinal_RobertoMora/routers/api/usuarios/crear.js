import { Router } from "express";
import validatorAdminMiddleware from "../../../middlewares/validator-admin.js";
import logger from "../../../logs/logger.js";
import { crearUsuario } from "../../../controllers/api/usuarios.js";

const routercrearusuarios = Router();

routercrearusuarios.post("/", validatorAdminMiddleware, (req, res, next) => {
  try {
    crearUsuario(req.body).then((data) => {
      if (data.autorizado) {
        res.render("login", data);
      } else {
        logger.info(data);
        res.render("registroerror", data);
      }
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default routercrearusuarios;
