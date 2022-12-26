import { Router } from "express";
import { mensajesDao } from "../../../daos/index.js";
import validatorAdminMiddleware from "../../../middlewares/validator-admin.js";
import logger from '../../../logs/logger.js'


const routerborrarmensajes = Router();

routerborrarmensajes.delete("/:id", validatorAdminMiddleware, (req, res, next) => {
  try {
    mensajesDao.borrar(req.params.id).then(() => {
      let msg={ mensaje: "Se elimino de manera correcta el mensaje" }
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
