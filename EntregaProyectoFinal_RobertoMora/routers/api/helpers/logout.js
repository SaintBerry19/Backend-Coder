import { Router } from "express";
import auth from "../../../middlewares/authorization.js";
import logger from "../../../logs/logger.js";


const logoutapi = Router();

logoutapi.post("/", auth, (req, res, next) => {
  try {
    req.session.destroy((error) => {
      if (!error) {
        let data={mensaje:'Sesion Finalizada'}
        logger.info(data)
        res.json(data);
        res.status(204).end();
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
export default logoutapi;
