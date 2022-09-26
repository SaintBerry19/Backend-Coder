const { Router } = require('express')
const ProductosController = require('../../controllers/productos')

const router = Router()

router.get('/', (req, res, next) => {
  try {
    const productos = ProductosController.obtener(req.query)
    const data = {
      productos,
      isEmpty: !productos.length,
      detailUrlBase: `${process.env.BASE_HOST}/productos`,
    }
    res.render('productos', data)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', (req, res, next) => {
  try {
    const producto = ProductosController.obtenerPorId(req.params.id)
    res.render('producto', producto)
  } catch (error) {
    next(error)
  }
})

module.exports = router