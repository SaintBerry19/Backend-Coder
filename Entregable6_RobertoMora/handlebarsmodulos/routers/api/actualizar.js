import { Router } from('express')
import ProductosController from('../../controllers/productos')
import validadorActualizarProductoMiddleware from('../../middlewares/validador-actualizar-productos')

const router = Router()

router.put('/:id', validadorActualizarProductoMiddleware, (req, res, next) => {
  try {
    ProductosController.actualizarPorId(req.params.id, req.body)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

export default  router