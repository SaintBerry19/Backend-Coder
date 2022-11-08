import  { Router } from 'express'
import {carritosDao} from '../../../daos/index.js'

const routerborrarcarrito = Router()

routerborrarcarrito.delete('/:id', (req, res, next) => {
  try {
    carritosDao.borrar(req.params.id)
    res.json({mensaje:'Se borro el carrito con exito'})
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
export default routerborrarcarrito