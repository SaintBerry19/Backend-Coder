import { Router } from('express')
import ProductosController from('../../controllers/productos')


const router = Router()

router.get('/visualizador', (req, res, next) => {
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

export default router
