import { Router } from 'express'
import {productosDao} from '../../../daos/index.js'
import validatorAdminMiddleware from '../../../middlewares/validator-admin.js'
import auth from "../../../middlewares/authorization.js"
import { base_host } from '../../../bin/www.js'
import logger from "../../../logs/logger.js";


const visualizador = Router()

visualizador.get('/visualizador',auth, validatorAdminMiddleware,(req, res, next) => {
    try {
      const productos = productosDao.listarAll()
      const data = {
        productos,
        username: req.session,
        isEmpty: !productos.length,
        base_url:base_host
      }
      logger.info(data)
      res.render('visualizador', data)
    } catch (error) {
      logger.error(error)
      next(error)
    }
})

export default visualizador
