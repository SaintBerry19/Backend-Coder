import { Router } from "express";
import { productosDao } from "../../../daos/index.js";

const obtener = Router();

obtener.get("/productos/", (req, res, next) => {
  try {
    productosDao.listarAll().then((value) => {
      const data = {
        value,
        isEmpty: !value.length,
        detailUrlBase: `${process.env.BASE_HOST}/productos`,
      };
      res.render("productos", data);
    });
  } catch (error) {
    next(error);
  }
});

obtener.get("/productos/:id", (req, res, next) => {
  try {
    productosDao.listar(req.params.id).then((value) => {
      if (process.env.TIPO_PERSISTENCIA === "mongodb") {
        const producto = value[0];
        res.render("producto", producto);
      } else {
        const producto = value;
        res.render("producto", producto);
      }
    });
  } catch (error) {
    next(error);
  }
});

export default obtener;
