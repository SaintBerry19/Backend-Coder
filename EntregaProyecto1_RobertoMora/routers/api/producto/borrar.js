const { Router } = require('express')
const ProductosController = require('../../../controllers/productos')
const validatorAdminMiddleware = require('../../../middlewares/validator-admin')

const router = Router()

router.delete('/:id', validatorAdminMiddleware,(req, res, next) => {
  try {
    ProductosController.borrarPorId(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router