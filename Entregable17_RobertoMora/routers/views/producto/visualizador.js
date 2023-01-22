import { Router } from 'express'
import validatorAdminMiddleware from '../../../middlewares/validator-admin.js'
import auth from "../../../middlewares/authorization.js"
import logger from "../../../logs/logger.js";
import { visualizadorProductos } from '../../../controllers/views/productos.js';

const visualizador = Router()

visualizador.get('/visualizador',auth, validatorAdminMiddleware,(req, res, next) => {
    try {
      visualizadorProductos(req.session).then((productos)=>{
      logger.info(productos)
      res.render('visualizador', productos)
      })
    } catch (error) {
      logger.error(error)
      next(error)
    }
})

export default visualizador
