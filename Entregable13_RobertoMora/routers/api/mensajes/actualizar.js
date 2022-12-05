import { Router } from "express";
import { mensajesDao } from "../../../daos/index.js";
import validatorAdminMiddleware from "../../../middlewares/validator-admin.js";

const routeractualizarmensajes = Router();

routeractualizarmensajes.put(
  "/:id/:method",
  validatorAdminMiddleware,
  (req, res, next) => {
    try {
      mensajesDao
        .actualizar(req.params.id, req.params.method, req.body)
        .then((value) => {
          res.json(value)
          res.status(204).end()
        });
    } catch (error) {
      next(error);
    }
  }
);

export default routeractualizarmensajes;
