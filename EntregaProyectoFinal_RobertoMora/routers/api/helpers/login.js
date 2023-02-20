import { Router } from "express";
import logger from "../../../logs/logger.js";
import { loginEntry } from "../../../controllers/views/helpers.js";
import { generateToken } from "../../../utils.js";

const loginapi = Router();

loginapi.post("/", (req, res, next) => {
  try {
    loginEntry(req.body.username, req.body.password).then((data) => {
      if (data.autorizado) {
        req.session.username = req.body.username;
        req.session.isAuth = true;
        let token = { access_token: generateToken(req.body.username) };
        data = { ...data, token: token };
        logger.info(data);
        res.json(data);
        res.status(204).end();
      } else {
        logger.info(data);
        res.json(data);
        res.status(204).end();
      }
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default loginapi;
