import { Router } from "express";
import { productosDao } from "../../../daos/index.js";
import validatorAdminMiddleware from "../../../middlewares/validator-admin.js";

const routeractualizarusuarios = Router();

routeractualizarusuarios.put(
  "/:id/:method",
  validatorAdminMiddleware,
  (req, res, next) => {
    try {
      productosDao
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

export default routeractualizarusuarios;
