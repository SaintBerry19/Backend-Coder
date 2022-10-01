import{ Router } from('express')
import ProductosController from('../../controllers/productos')

const router = Router()

router.delete('/:id', (req, res, next) => {
  try {
    ProductosController.borrarPorId(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

export default router