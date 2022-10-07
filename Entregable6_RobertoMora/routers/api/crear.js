const { Router } = require('express')
const ProductosController = require('../../controllers/productos')
const validadorCrearProductoMiddleware = require('../../middlewares/validador-crear-productos')

const router = Router()

router.post('/', validadorCrearProductoMiddleware, (req, res, next) => {
  try {
    ProductosController.crear(req.body)
    const data = {mensaje: 'Actualizacion: Producto ingresado con exito'}
    res.render('ingresar',data)
  } catch (error) {
    next(error)
  }
})

module.exports = router