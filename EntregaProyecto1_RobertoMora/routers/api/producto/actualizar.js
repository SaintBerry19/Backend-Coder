const { Router } = require('express')
const ProductosController = require('../../../controllers/productos')
const validadorActualizarProductoMiddleware = require('../../../middlewares/validador-actualizar-productos')
const validatorAdminMiddleware = require('../../../middlewares/validator-admin')

const router = Router()

router.put('/:id', validatorAdminMiddleware,validadorActualizarProductoMiddleware, (req, res, next) => {
  try {
    ProductosController.actualizarPorId(req.params.id, req.body)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router