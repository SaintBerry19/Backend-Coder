import { Router } from 'express'
import ProductosController from '../../../controllers/productos.js'
import validatorAdminMiddleware from '../../../middlewares/validator-admin.js'

const routerborrar = Router()

routerborrar.delete('/:id', validatorAdminMiddleware,(req, res, next) => {
  try {
    ProductosController.borrarPorId(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

export default routerborrar