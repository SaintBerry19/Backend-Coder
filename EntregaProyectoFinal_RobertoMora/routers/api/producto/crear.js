import { Router } from "express";
import validatorAdminMiddleware from "../../../middlewares/validator-admin.js";
import logger from "../../../logs/logger.js";
import { crearProductos } from "../../../controllers/api/productos.js";
import authorizationJwt from "../../../middlewares/authorization-jwt.js";

const routercrear = Router();

routercrear.post("/", authorizationJwt,validatorAdminMiddleware, (req, res, next) => {
  try {
    crearProductos(req.body).then((data) => {
      logger.info(data);
      res.json(data);
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default routercrear;
