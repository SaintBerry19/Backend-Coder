import { Router } from "express";
import auth from "../../../middlewares/authorization.js";
import logger from "../../../logs/logger.js";
import { testProductos } from "../../../controllers/views/productos.js";

const test = Router();

test.get("/test/", auth, (req, res, next) => {
  try {
    testProductos().then((data) => {
      logger.info(data);
      res.render("test", data);
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default test;
