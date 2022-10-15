import { Router } from 'express'
import ProductosController from '../../../controllers/productos.js'

const routerobtener = Router()

routerobtener.get('/', (req, res, next) => {
  try {
    const productos = ProductosController.obtener(req.query)
    res.json(productos)
  } catch (error) {
    next(error)
  }
})

routerobtener.get('/:id', (req, res, next) => {
  try {
    const productos = ProductosController.obtenerPorId(req.params.id)
    res.json(productos)
  } catch (error) {
    next(error)
  }
})

export default routerobtener