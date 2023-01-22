import { Router } from "express";
import auth from "../../../middlewares/authorization.js";
import compression from "compression";
import logger from "../../../logs/logger.js";
import { infoView } from "../../../controllers/views/helpers.js";

const info = Router();

info.get("/info", auth, (req, res, next) => {
  try {
    infoView().then((data) => {
      logger.info(data);
      res.render("info", data);
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

info.get("/infozip", auth, compression(), (req, res, next) => {
  try {
    infoView().then((data) => {
      logger.info(data);
      res.render("info", data);
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default info;
