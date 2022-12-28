import { Router } from "express";
import { carritosDao, productosDao } from "../../../daos/index.js";
import { usuariosDao } from "../../../daos/index.js";
import auth from "../../../middlewares/authorization.js";
import { base_host } from "../../../bin/www.js";
import logger from "../../../logs/logger.js";
import { sms } from "../../../twilio.js";
import { whatsapptext } from "../../../whatsapp.js";
import sendMail from "../../../gmail.js";

const carrito = Router();

carrito.get("/carrito/", auth, (req, res, next) => {
  try {
    usuariosDao.buscar(req.session.username).then((userinfo) => {
      let userid = userinfo[0]._id.toString();
      let avatar = userinfo[0].avatar;
      carritosDao.buscar(userid).then((carritoinfo) => {
        let carritoid = carritoinfo[0]._id.toString();
        let value = carritoinfo[0].productos;
        let total = 0;
        for (let product of value) {
          total = total + product.subtotal;
        }
        const { username } = { username: req.session };
        const data = {
          value,
          avatar: avatar,
          username: username,
          userid: userid,
          carritoid: carritoid,
          isEmpty: !value.length,
          detailUrlBase: `${base_host}/productos`,
          base_url: base_host,
          total: total,
        };
        logger.info(data);
        res.render("carrito", data);
      });
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

carrito.post("/carrito/vaciar", auth, (req, res, next) => {
  try {
    usuariosDao.buscar(req.session.username).then((userinfo) => {
      let userid = userinfo[0]._id.toString();
      let avatar = userinfo[0].avatar;
      carritosDao.buscar(userid).then((carritoinfo) => {
        let carritoid = carritoinfo[0]._id.toString();
        let productos = [];
        let data = { productos: productos };
        carritosDao.actualizar(carritoid, data).then((actualizar) => {
          const username = {
            username: {
              username: req.session.username,
              base_url: base_host,
              avatar: avatar,
              mensaje: "Se vacio el carrito con exito!",
            },
          };
          logger.info(actualizar);
          res.render("menu", username);
        });
      });
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

carrito.post("/carrito/comprar", auth, (req, res, next) => {
  try {
    usuariosDao.buscar(req.session.username).then((userinfo) => {
      let userid = userinfo[0]._id.toString();
      let avatar = userinfo[0].avatar;
      let telefono = userinfo[0].phone;
      let whatsapp = `whatsapp:+521${telefono.toString()}`;
      let email = userinfo[0].email;
      telefono = `+52${telefono.toString()}`;
      carritosDao.buscar(userid).then((carritoinfo) => {
        let carritoid = carritoinfo[0]._id.toString();
        let productos = [];
        let data = { productos: productos };
        carritosDao.actualizar(carritoid, data).then((actualizar) => {
          const username = {
            username: {
              username: req.session.username,
              base_url: base_host,
              avatar: avatar,
              mensaje: "Se realizo la compra con exito!",
            },
          };
          sendMail(email, carritoinfo[0].productos);
          logger.info(actualizar);
          sms(telefono).then(() => {
            whatsapptext(whatsapp, email, carritoinfo[0].productos).then(() => {
              res.render("menu", username);
            });
          });
        });
      });
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default carrito;
