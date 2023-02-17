import { Router } from "express";
import logger from "../../../logs/logger.js";
import { editUser } from "../../../controllers/views/helpers.js";
import { actualizarUsuario } from "../../../controllers/api/usuarios.js";

const user = Router();

user.get("/user", (req, res, next) => {
  editUser(req.session.username, req.session).then((username) => {
    logger.info(username);
    res.render("user", username);
  });
});

user.post("/user/:id", (req, res, next) => {
  try {
    actualizarUsuario(req.params.id, req.body, req.session.username).then(
      (username) => {
        logger.info(username);
        res.render("menu", username);
      }
    );
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default user;
