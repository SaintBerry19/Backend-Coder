import { Router } from "express";
import { usuariosDao } from "../../../daos/index.js";
import validatorAdminMiddleware from "../../../middlewares/validator-admin.js";
import logger from '../../../logs/logger.js'

const routerborrarusuarios = Router();

routerborrarusuarios.delete("/:id", validatorAdminMiddleware, (req, res, next) => {
  try {
    usuariosDao.borrar(req.params.id).then(() => {
      let msg={ mensaje: "Se elimino de manera correcta el producto" }
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
