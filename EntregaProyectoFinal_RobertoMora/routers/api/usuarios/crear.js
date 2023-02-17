import { Router } from "express";
import validatorAdminMiddleware from "../../../middlewares/validator-admin.js";
import logger from "../../../logs/logger.js";
import { crearUsuario } from "../../../controllers/api/usuarios.js";
import { generateToken } from "../../../utils.js";

const routercrearusuarios = Router();

routercrearusuarios.post("/", validatorAdminMiddleware, (req, res, next) => {
  try {
    crearUsuario(req.body).then((data) => {
      if (data.autorizado) {
        logger.info({ access_token: generateToken(req.body.username) });
        res.json({ access_token: generateToken(req.body.username) });
      } else {
        logger.info(data);
        res.json(data);
      }
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default routercrearusuarios;
