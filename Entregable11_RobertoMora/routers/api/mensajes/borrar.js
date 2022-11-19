import { Router } from "express";
import { mensajesDao } from "../../../daos/index.js";
import validatorAdminMiddleware from "../../../middlewares/validator-admin.js";

const routerborrarmensajes = Router();

routerborrarmensajes.delete("/:id", validatorAdminMiddleware, (req, res, next) => {
  try {
    mensajesDao.borrar(req.params.id).then(() => {
      res.json({ mensaje: "Se elimino de manera correcta el mensaje" });
      res.status(204).end();
    });
  } catch (error) {
    next(error);
  }
});

export default routerborrarmensajes;
