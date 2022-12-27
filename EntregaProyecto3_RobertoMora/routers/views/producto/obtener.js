import { Router } from "express";
import { carritosDao, productosDao } from "../../../daos/index.js";
import { usuariosDao } from "../../../daos/index.js";
import auth from "../../../middlewares/authorization.js";
import { base_host } from "../../../bin/www.js";
import logger from "../../../logs/logger.js";

const obtener = Router();

obtener.get("/productos/", auth, (req, res, next) => {
  try {
    productosDao.listarAll().then((value) => {
      usuariosDao.buscar(req.session.username).then((userinfo) => {
        let userid = userinfo[0]._id.toString();
        carritosDao.buscar(userid).then((carritoinfo) => {
          let carritoid=carritoinfo[0]._id.toString();
          const { username } = { username: req.session };
          const data = {
            value,
            username: username,
            userid: userid,
            carritoid: carritoid,
            isEmpty: !value.length,
            detailUrlBase: `${base_host}/productos`,
            base_url: base_host,
          };
          logger.info(data);
          res.render("productos", data);
        });
      });
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

obtener.get("/productos/:id", auth, (req, res, next) => {
  try {
    productosDao.listar(req.params.id).then((value) => {
      if (process.env.TIPO_PERSISTENCIA === "mongodb") {
        const producto = value[0];
        const data = {
          producto: producto,
          username: req.session,
          base_url: base_host,
        };
        logger.info(data);
        res.render("producto", data);
      } else {
        const producto = value;
        const data = {
          producto: producto,
          username: req.session,
          base_url: base_host,
        };
        logger.info(data);
        res.render("producto", data);
      }
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default obtener;
