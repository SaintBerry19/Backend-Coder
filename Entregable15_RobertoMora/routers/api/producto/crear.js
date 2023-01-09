import { Router } from "express";
import validatorAdminMiddleware from "../../../middlewares/validator-admin.js";
import logger from "../../../logs/logger.js";
import { crearProductos } from "../../../controllers/api/productos.js";

const routercrear = Router();

routercrear.post("/", validatorAdminMiddleware, (req, res, next) => {
  try {
    crearProductos(req.body).then((data) => {
      logger.info(data);
      res.render("ingresar", data);
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default routercrear;
