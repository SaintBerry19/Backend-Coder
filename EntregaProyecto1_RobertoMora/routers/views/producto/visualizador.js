import { Router } from 'express'
import ProductosController from '../../../controllers/productos.js'
import validatorAdminMiddleware from '../../../middlewares/validator-admin.js'


const visualizador = Router()

visualizador.get('/visualizador', validatorAdminMiddleware,(req, res, next) => {
    try {
      const productos = ProductosController.obtener(req.query)
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
