import  { Router } from 'express'
import  CarritosController from '../../../controllers/carrito.js'

const routeragregarcarrito = Router()

routeragregarcarrito.post('/:id/productos/:id_prod', (req, res, next) => {
  try {
    CarritosController.agregarPorId(req.params.id,req.params.id_prod)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

export default routeragregarcarrito