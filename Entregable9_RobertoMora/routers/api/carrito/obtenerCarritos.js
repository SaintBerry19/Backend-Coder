import { Router } from "express";
import { carritosDao } from "../../../daos/index.js";

const routerobtenercarrito = Router();

routerobtenercarrito.get("/", (req, res, next) => {
  try {
    carritosDao.listarAll(req.query).then((value) => {
      res.json(value);
    });
  } catch (error) {
    next(error);
  }
});

routerobtenercarrito.get("/:id/productos", (req, res, next) => {
  try {
    carritosDao.listar(req.params.id).then((value) => {
      res.json(value);
    });
  } catch (error) {
    next(error);
  }
});

export default routerobtenercarrito;
