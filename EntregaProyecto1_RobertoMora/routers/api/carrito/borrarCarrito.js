const { Router } = require('express')
const CarritosController = require('../../../controllers/carrito')

const router = Router()

router.delete('/:id', (req, res, next) => {
  try {
    CarritosController.borrarCarrito(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
router.delete('/:id/productos/:id_prod', (req, res, next) => {
  try {
    CarritosController.borrarProductoPorId(req.params.id,req.params.id_prod)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router