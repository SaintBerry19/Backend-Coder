import { Router } from "express";
import { productosDao } from "../../../daos/index.js";
import auth from "../../../middlewares/authorization.js"

const obtener = Router();

obtener.get("/productos/",auth, (req, res, next) => {
  try {
    productosDao.listarAll().then((value) => {
      const { username } = {username: req.session}
      const data = {
        value,
        username: username,
        isEmpty: !value.length,
        detailUrlBase: `${process.env.BASE_HOST}/productos`,
      };
      res.render("productos", data);
    });
  } catch (error) {
    next(error);
  }
});

obtener.get("/productos/:id", auth, (req, res, next) => {
  try {
    productosDao.listar(req.params.id).then((value) => {
      if (process.env.TIPO_PERSISTENCIA === "mongodb") {
        const producto = value[0];   
        const data={producto:producto,username: req.session}
        res.render("producto", data);
      } else {
        const producto = value;
        const data={producto:producto,username: req.session}
        res.render("producto", data);
      }
    });
  } catch (error) {
    next(error);
  }
});

export default obtener;
