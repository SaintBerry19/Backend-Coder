import { Router } from "express";
import { usuariosDao } from "../../../daos/index.js";
import validatorAdminMiddleware from "../../../middlewares/validator-admin.js";
import logger from "../../../logs/logger.js";
import { base_host } from "../../../bin/www.js";
import { encryptPassword } from "../../../utils.js";

const routeractualizarusuarios = Router();

routeractualizarusuarios.post(
  "/:id/update",
  validatorAdminMiddleware,
  (req, res, next) => {
    try {
      let body = { ...req.body, password: encryptPassword(req.body.password) };
      usuariosDao.actualizar(req.params.id, body).then((value) => {
        usuariosDao.buscar(req.session.username).then((value) => {
          let avatar = value[0].avatar;
          const username = {
            username: {
              username: req.session.username,
              base_url: base_host,
              avatar: avatar,
            },
          };
          logger.info(username);
          res.render("menu", username);
        });
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
);

export default routeractualizarusuarios;
