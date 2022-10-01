import { Router } from ('express')
import ProductosController from ('../../controllers/productos')

const router = Router()

router.get('/', (req, res, next) => {
  try {
    const productos = ProductosController.obtener(req.query)
    res.json(productos)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', (req, res, next) => {
  try {
    const productos = ProductosController.obtenerPorId(req.params.id)
    res.json(productos)
  } catch (error) {
    next(error)
  }
})

module.exports = router