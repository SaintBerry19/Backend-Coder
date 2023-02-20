import { Router } from "express";
import logger from "../../../logs/logger.js";
import { actualizarCarrito,removerCarrito } from "../../../controllers/views/carrito.js";
const carritoActualizar = Router();

carritoActualizar.post("/carrito/:id/remove/:idproducto", (req, res, next) => {
    try {
      removerCarrito(
        req.params.id,
        req.params.idproducto,
        req.session.username
      ).then((data) => {
        logger.info(data.actualizar);
        res.render("menu", data.username);
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  });
  
  carritoActualizar.post("/carrito/:id/update", (req, res, next) => {
    try {
      actualizarCarrito(req.body.array,req.params.id,req.session.username).then((data) => {
      logger.info(data.actualizar);
      res.render("menu", data.username);
      })
  
    } catch (error) {
      logger.error(error);
      next(error);
    }
  });

export default carritoActualizar;