const { Router } = require('express')
const ProductosController = require('../../controllers/productos')
const validadorCrearProductoMiddleware = require('../../middlewares/validador-crear-productos')

const router = Router()

router.post('/', validadorCrearProductoMiddleware, (req, res, next) => {
  try {
    const producto = ProductosController.crear(req.body)
    res.status(201).json(producto)
  } catch (error) {
    next(error)
  }
})

module.exports = router