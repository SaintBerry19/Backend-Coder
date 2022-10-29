import { Router } from 'express'
import {productosDao} from '../../../daos/index.js'
import validatorAdminMiddleware from '../../../middlewares/validator-admin.js'


const visualizador = Router()

visualizador.get('/visualizador', validatorAdminMiddleware,(req, res, next) => {
    try {
      const productos = productosDao.listarAll()
      const data = {
        productos,
        isEmpty: !productos.length,
      }
      res.render('visualizador', data)
    } catch (error) {
      next(error)
    }
})

export default visualizador
