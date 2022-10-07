const { Router } = require('express')
const CarritosController = require('../../../controllers/carrito')

const router = Router()

router.post('/:id/productos/:id_prod', (req, res, next) => {
  try {
    CarritosController.agregarPorId(req.params.id,req.params.id_prod)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router