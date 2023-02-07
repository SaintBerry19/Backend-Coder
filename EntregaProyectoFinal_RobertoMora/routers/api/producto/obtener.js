import { Router } from 'express'
import logger from '../../../logs/logger.js'
import { obtenerProductos,obtenerProducto } from '../../../controllers/api/productos.js'

const routerobtener = Router()

routerobtener.get('/', (req, res, next) => {
  try {
    obtenerProductos().then((value)=>{  
      logger.info(value)
      res.json(value)})
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

routerobtener.get('/:id', (req, res, next) => {
  try {
    obtenerProducto(req.params.id).then((value)=>{  
      logger.info(value)
      res.json(value)})
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

export default routerobtener