import  { Router } from 'express'
import {carritosDao} from '../../../daos/index.js'
import logger from '../../../logs/logger.js'


const routerborrarcarrito = Router()

routerborrarcarrito.delete('/:id', (req, res, next) => {
  try {
    carritosDao.borrar(req.params.id)
    let msg= {mensaje:'Se borro el carrito con exito'}
    logger.info(msg)
    res.json(msg)
    res.status(204).end()
  } catch (error) {
    logger.error(error)
    next(error)
  }
})
export default routerborrarcarrito