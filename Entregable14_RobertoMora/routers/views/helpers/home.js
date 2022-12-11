import { Router } from "express";
import auth from "../../../middlewares/authorization.js";
import { base_host } from "../../../bin/www.js";
import logger from "../../../logs/logger.js";

const home = Router();

home.get("/home", auth, (req, res, next) => {
  try {
    const { username } = {
      username: { username: req.session, base_url: base_host },
    };
    logger.info(username);
    res.render("menu", username);
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default home;
