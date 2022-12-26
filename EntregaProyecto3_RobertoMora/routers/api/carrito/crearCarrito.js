import { Router } from 'express'
import {carritosDao} from '../../../daos/index.js'
import logger from '../../../logs/logger.js'


const routercrearcarrito = Router()

routercrearcarrito.post('/',(req, res, next) => {
  try {
    const carrito=carritosDao.guardar()
    logger.info(carrito)
    res.json(carrito)
    res.status(204).end()
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

export default routercrearcarrito