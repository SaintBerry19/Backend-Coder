import  { Router } from 'express'
import  CarritosController from '../../../controllers/carrito.js'

const routerborrarcarrito = Router()

routerborrarcarrito.delete('/:id', (req, res, next) => {
  try {
    CarritosController.borrarCarrito(req.params.id)
    res.json({mensaje:'Se borro el carrito con exito'})
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
routerborrarcarrito.delete('/:id/productos/:id_prod', (req, res, next) => {
  try {
    CarritosController.borrarProductoPorId(req.params.id,req.params.id_prod)
    res.json({mensaje:'Se borro el producto con exito'})
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

export default routerborrarcarrito