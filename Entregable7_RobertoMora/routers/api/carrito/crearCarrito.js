import { Router } from 'express'
import CarritosController from '../../../controllers/carrito.js'

const routercrearcarrito = Router()

routercrearcarrito.post('/',(req, res, next) => {
  try {
    const carrito=CarritosController.crear()
    res.json(carrito)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

export default routercrearcarrito