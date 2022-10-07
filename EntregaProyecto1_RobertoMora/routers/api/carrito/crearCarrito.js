const { Router } = require('express')
const CarritosController = require('../../../controllers/carrito')

const router = Router()

router.post('/',(req, res, next) => {
  try {
    CarritosController.crear()
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router