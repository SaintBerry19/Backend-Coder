import { Router } from 'express'
import ProductosController from '../../../controllers/productos.js'
import validatorAdminMiddleware from '../../../middlewares/validator-admin.js'

const routerborrar = Router()

routerborrar.delete('/:id', validatorAdminMiddleware,(req, res, next) => {
  try {
    ProductosController.borrarPorId(req.params.id)
    res.json({mensaje: 'Se elimino de manera correcta el producto'})
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

export default routerborrar