import { Router } from 'express'
import CarritosController from '../../../controllers/carrito.js'

const routerobtenercarrito = Router()

routerobtenercarrito.get('/', (req, res, next) => {
  try {
    const carritos = CarritosController.obtener(req.query)
    res.json(carritos)
  } catch (error) {
    next(error)
  }
})

routerobtenercarrito.get('/:id/productos', (req, res, next) => {
  try {
    const carritos = CarritosController.obtenerPorId(req.params.id)
    res.json(carritos)
  } catch (error) {
    next(error)
  }
})

export default routerobtenercarrito