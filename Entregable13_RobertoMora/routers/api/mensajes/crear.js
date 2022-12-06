import { Router } from 'express'
import {mensajesDao} from '../../../daos/index.js'
import validatorAdminMiddleware from '../../../middlewares/validator-admin.js'

const routercrearmensajes = Router()

routercrearmensajes.post('/', validatorAdminMiddleware, (req, res, next) => {
  try {
    mensajesDao.guardar(req.body)
    const data = {mensaje: 'Actualizacion: Mensaje ingresado con exito'}
    res.json(data)
  } catch (error) {
    next(error)
  }
})

export default routercrearmensajes