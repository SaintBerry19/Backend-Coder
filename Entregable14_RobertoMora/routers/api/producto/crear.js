import { Router } from 'express'
import {productosDao} from '../../../daos/index.js'
import validatorAdminMiddleware from '../../../middlewares/validator-admin.js'
import logger from '../../../logs/logger.js'

const routercrear = Router()

routercrear.post('/', validatorAdminMiddleware, (req, res, next) => {
  try {
    productosDao.guardar(req.body)
    const data = {mensaje: 'Actualizacion: Producto ingresado con exito'}
    logger.info(data)
    res.render('ingresar',data)
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

export default routercrear