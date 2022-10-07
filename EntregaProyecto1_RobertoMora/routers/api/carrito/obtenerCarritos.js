const { Router } = require('express')
const CarritosController = require('../../../controllers/carrito')

const router = Router()

router.get('/', (req, res, next) => {
  try {
    const carritos = CarritosController.obtener(req.query)
    res.json(carritos)
  } catch (error) {
    next(error)
  }
})

router.get('/:id/productos', (req, res, next) => {
  try {
    const carritos = CarritosController.obtenerPorId(req.params.id)
    res.json(carritos)
  } catch (error) {
    next(error)
  }
})

module.exports = router