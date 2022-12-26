import { Router } from 'express'
import {mensajesDao} from '../../../daos/index.js'
import validatorAdminMiddleware from '../../../middlewares/validator-admin.js'
import logger from '../../../logs/logger.js'

const routercrearmensajes = Router()

routercrearmensajes.post('/', validatorAdminMiddleware, (req, res, next) => {
  try {
    mensajesDao.guardar(req.body)
    const data = {mensaje: 'Actualizacion: Mensaje ingresado con exito'}
    logger.info(data)
    res.json(data)
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

export default routercrearmensajes