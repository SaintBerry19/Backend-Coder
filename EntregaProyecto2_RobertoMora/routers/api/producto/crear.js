import { Router } from 'express'
import ProductosController from '../../../controllers/productos.js'
import validatorAdminMiddleware from '../../../middlewares/validator-admin.js'

const routercrear = Router()

routercrear.post('/', validatorAdminMiddleware, (req, res, next) => {
  try {
    ProductosController.crear(req.body)
    const data = {mensaje: 'Actualizacion: Producto ingresado con exito'}
    res.render('ingresar',data)
  } catch (error) {
    next(error)
  }
})

export default routercrear