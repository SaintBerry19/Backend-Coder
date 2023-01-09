import { Router } from "express";
import validatorAdminMiddleware from "../../../middlewares/validator-admin.js";
import logger from '../../../logs/logger.js'
import { borrarMensaje } from "../../../controllers/api/mensajes.js";


const routerborrarmensajes = Router();

routerborrarmensajes.delete("/:id", validatorAdminMiddleware, (req, res, next) => {
  try {
    borrarMensaje(req.params.id).then((msg) => {
      logger.info(msg)
      res.json(msg);
      res.status(204).end();
    });
  } catch (error) {
    logger.error(error)
    next(error);
  }
});

export default routerborrarmensajes;
