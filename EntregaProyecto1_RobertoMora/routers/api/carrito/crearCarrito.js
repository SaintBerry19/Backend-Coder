const { Router } = require('express')
const CarritosController = require('../../../controllers/carrito')

const router = Router()

router.post('/',(req, res, next) => {
  try {
    const carrito=CarritosController.crear()
    res.json(carrito)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router