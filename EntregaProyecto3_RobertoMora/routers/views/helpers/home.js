import { Router } from "express";
import auth from "../../../middlewares/authorization.js";
import { base_host } from "../../../bin/www.js";
import logger from "../../../logs/logger.js";
import { usuariosDao } from "../../../daos/index.js";

const home = Router();

home.get("/home", auth, (req, res, next) => {
  try {
    usuariosDao.buscar(req.session.username).then((value) => {
      let avatar = value[0].avatar;
      const username  = {
        username: {
          username: req.session.username,
          base_url: base_host,
          avatar: avatar,
        },
      };
      logger.info(username);
      res.render("menu", username);
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default home;
