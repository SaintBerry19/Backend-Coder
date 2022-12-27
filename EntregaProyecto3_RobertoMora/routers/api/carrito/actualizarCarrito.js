import  { Router } from 'express'
import {carritosDao} from '../../../daos/index.js'
import logger from '../../../logs/logger.js'


const routeractualizarcarrito = Router()

routeractualizarcarrito.post('/:id/update', (req, res, next) => {
  try {
    carritosDao.actualizar(req.params.id, req.body)
    let msg= {mensaje:'Se actualizo el carrito'}
    logger.info(msg)
    res.json(msg)
    res.status(204).end()
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

export default routeractualizarcarrito