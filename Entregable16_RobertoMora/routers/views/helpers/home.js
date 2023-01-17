import { Router } from "express";
import auth from "../../../middlewares/authorization.js";
import logger from "../../../logs/logger.js";
import { homeView } from "../../../controllers/views/helpers.js";

const home = Router();

home.get("/home", auth, (req, res, next) => {
  try {
    homeView(req.session.username).then((username) => {
      logger.info(username);
      res.render("menu", username);
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default home;
