import  { Router } from 'express'
import {carritosDao} from '../../../daos/index.js'

const routeractualizarcarrito = Router()

routeractualizarcarrito.put('/:id/:method', (req, res, next) => {
  try {
    carritosDao.actualizar(req.params.id,req.params.method, req.body)
    res.json({mensaje:'Se actualizo el carrito'})
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

export default routeractualizarcarrito