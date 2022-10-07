const { Router } = require('express')
const ProductosController = require('../../../controllers/productos')
const validatorAdminMiddleware = require('../../../middlewares/validator-admin')


const router = Router()

router.get('/visualizador', validatorAdminMiddleware,(req, res, next) => {
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

module.exports = router
