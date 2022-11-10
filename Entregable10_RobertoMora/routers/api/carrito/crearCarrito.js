import { Router } from 'express'
import {carritosDao} from '../../../daos/index.js'

const routercrearcarrito = Router()

routercrearcarrito.post('/',(req, res, next) => {
  try {
    const carrito=carritosDao.guardar()
    res.json(carrito)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

export default routercrearcarrito