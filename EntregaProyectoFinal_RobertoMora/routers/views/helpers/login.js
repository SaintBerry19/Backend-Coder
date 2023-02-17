import { Router } from "express";

import logger from "../../../logs/logger.js";
import { loginView, loginEntry } from "../../../controllers/views/helpers.js";
import { generateToken } from "../../../utils.js";

const login = Router();

login.get("/login", (req, res, next) => {
  try {
    loginView(req.session.username, req.session.contador).then((data) => {
      if (data.autorizado) {
        logger.info(data.value);
        res.render("menu", data.value);
      } else {
        let msg = { mensaje: "usuario no autorizado" };
        logger.info(msg);
        res.render("login");
      }
    });
  } catch (error) {
    logger.error(error);
  }
});

login.post("/login", (req, res, next) => {
  try {
    loginEntry(req.body.username, req.body.password).then((data) => {
      if (data.autorizado) {
        req.session.username = req.body.username;
        req.session.isAuth = true;
        logger.info(data);
        let token={ access_token: generateToken(req.body.username) }
        console.log(token);
        res.render("menu", data);
      } else {
        logger.info(data);
        res.render("loginerror", data);
      }
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default login;
