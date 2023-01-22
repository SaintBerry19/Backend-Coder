import { Router } from "express";
import auth from "../../../middlewares/authorization.js";
import { base_host } from "../../../bin/www.js";
import logger from "../../../logs/logger.js";


const logout = Router();

logout.post("/logout", auth, (req, res, next) => {
  try {
    req.session.destroy((error) => {
      if (!error) {
        const data = { base_url:base_host}
        logger.info(data)
        res.render("login",data);
      } else {
        logger.info(error.message)
        res.send("Ah ocurrido un error", error.message);
      }
    });
  } catch (error) {
    logger.error(error)
    next(error);
  }
});
export default logout;
