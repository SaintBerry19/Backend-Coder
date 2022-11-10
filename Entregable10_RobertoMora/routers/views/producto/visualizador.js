import { Router } from 'express'
import {productosDao} from '../../../daos/index.js'
import validatorAdminMiddleware from '../../../middlewares/validator-admin.js'
import auth from "../../../middlewares/authorization.js"

const visualizador = Router()

visualizador.get('/visualizador',auth, validatorAdminMiddleware,(req, res, next) => {
    try {
      const productos = productosDao.listarAll()
      const data = {
        productos,
        username: req.session,
        isEmpty: !productos.length,
      }
      res.render('visualizador', data)
    } catch (error) {
      next(error)
    }
})

export default visualizador
