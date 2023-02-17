import { Router } from 'express'
import validatorAdminMiddleware from '../../../middlewares/validator-admin.js'
import auth from "../../../middlewares/authorization.js"
import { base_host } from '../../../bin/www.js'
import logger from "../../../logs/logger.js";
import { crearProductos } from '../../../controllers/api/productos.js';


const  ingresar = Router()

ingresar.get('/ingresar/',auth, validatorAdminMiddleware,(req, res, next) => {
  try {
    const { username } = {username: req.session, base_url:base_host}
    logger.info(username)
    res.render('ingresar',username)
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

ingresar.post('/ingresar/',auth, validatorAdminMiddleware,(req, res, next) => {
  try {
    crearProductos(req.body).then((data) => {
      logger.info(data);
      res.render("ingresar", data);
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
})

export default ingresar
