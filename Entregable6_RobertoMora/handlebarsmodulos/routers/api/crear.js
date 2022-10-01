import { Router } from ('express')
import ProductosController from ('../../controllers/productos')
import validadorCrearProductoMiddleware from ('../../middlewares/validador-crear-productos')

const router = Router()

router.post('/', validadorCrearProductoMiddleware, (req, res, next) => {
  try {
    ProductosController.crear(req.body)
    const data = {mensaje: 'Actualizacion: Producto ingresado con exito'}
    res.render('ingresar',data)
  } catch (error) {
    next(error)
  }
})

export default router