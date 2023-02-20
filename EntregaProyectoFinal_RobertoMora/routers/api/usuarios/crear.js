import { Router } from "express";
import validatorAdminMiddleware from "../../../middlewares/validator-admin.js";
import logger from "../../../logs/logger.js";
import { crearUsuario } from "../../../controllers/api/usuarios.js";

const routercrearusuarios = Router();

routercrearusuarios.post("/", validatorAdminMiddleware, (req, res, next) => {
  try {
    crearUsuario(req.body).then((data) => {
      if (data.autorizado) {
        res.json(data);
        res.status(204).end();
      } else {
        res.json(data);
        res.status(204).end();
      }
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default routercrearusuarios;
