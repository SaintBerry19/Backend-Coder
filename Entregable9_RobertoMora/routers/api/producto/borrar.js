import { Router } from "express";
import { productosDao } from "../../../daos/index.js";
import validatorAdminMiddleware from "../../../middlewares/validator-admin.js";

const routerborrar = Router();

routerborrar.delete("/:id", validatorAdminMiddleware, (req, res, next) => {
  try {
    productosDao.borrar(req.params.id).then(() => {
      res.json({ mensaje: "Se elimino de manera correcta el producto" });
      res.status(204).end();
    });
  } catch (error) {
    next(error);
  }
});

export default routerborrar;
