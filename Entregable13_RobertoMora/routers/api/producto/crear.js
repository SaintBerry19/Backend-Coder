import { Router } from 'express'
import {productosDao} from '../../../daos/index.js'
import validatorAdminMiddleware from '../../../middlewares/validator-admin.js'

const routercrear = Router()

routercrear.post('/', validatorAdminMiddleware, (req, res, next) => {
  try {
    productosDao.guardar(req.body)
    const data = {mensaje: 'Actualizacion: Producto ingresado con exito'}
    res.render('ingresar',data)
  } catch (error) {
    next(error)
  }
})

export default routercrear