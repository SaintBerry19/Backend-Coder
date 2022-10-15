import { Router } from 'express'
import ProductosController from '../../../controllers/productos.js'
import validatorAdminMiddleware from '../../../middlewares/validator-admin.js'

const routeractualizar = Router()

routeractualizar.put('/:id', validatorAdminMiddleware, (req, res, next) => {
  try {
    ProductosController.actualizarPorId(req.params.id, req.body)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

export default routeractualizar