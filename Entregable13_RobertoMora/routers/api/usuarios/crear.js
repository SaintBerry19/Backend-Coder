import { Router } from "express";
import { usuariosDao } from "../../../daos/index.js";
import validatorAdminMiddleware from "../../../middlewares/validator-admin.js";
import { encryptPassword} from '../../../utils.js'
import { base_host } from '../../../bin/www.js'

const routercrearusuarios = Router();

routercrearusuarios.post("/", validatorAdminMiddleware, (req, res, next) => {
  try {
    usuariosDao.buscar(req.body.username).then((value) => {
      if (value.length > 0) {
        const data = { mensaje: "Username ya utilizado" ,base_url:base_host};
        res.render("registroerror", data);
      } else {
        const newUser = {
          ...req.body,
          password: encryptPassword(req.body.password),
        }
        usuariosDao.guardar(newUser);
        const data = {
          mensaje:
            "Actualizacion: Usuario ingresado con exito, puede iniciar sesion",
            base_url:base_host
        };
        res.render("login", data);
      }
    });
  } catch (error) {
    next(error);
  }
});

export default routercrearusuarios;
