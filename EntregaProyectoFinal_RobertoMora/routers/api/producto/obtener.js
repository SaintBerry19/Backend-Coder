import { Router } from 'express'
import logger from '../../../logs/logger.js'
import { obtenerProductos,obtenerProducto } from '../../../controllers/api/productos.js'
import authorization from '../../../middlewares/authorization-jwt.js'

const routerobtener = Router()

routerobtener.get('/',authorization, (req, res, next) => {
  try {
    obtenerProductos().then((value)=>{  
      logger.info(value)
      res.json(value)})
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

routerobtener.get('/:id', authorization,(req, res, next) => {
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