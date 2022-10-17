import { Router } from 'express'
import ProductosController from '../../../controllers/productos.js'

const obtener = Router()

obtener.get('/productos/', (req, res, next) => {
  try {
    const productos = ProductosController.obtener(req.query)
    const data = {
      productos,
      isEmpty: !productos.isLength,
      detailUrlBase: `${process.env.BASE_HOST}/productos`,
    }
    res.render('productos', data)
  } catch (error) {
    next(error)
  }
})

obtener.get('/productos/:id', (req, res, next) => {
  try {
    const producto = ProductosController.obtenerPorId(req.params.id)
    console.log(producto)
    res.render('producto', producto)
  } catch (error) {
    next(error)
  }
})

export default obtener
