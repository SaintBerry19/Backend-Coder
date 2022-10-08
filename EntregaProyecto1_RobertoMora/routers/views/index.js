const { Router } = require('express')
const obtener = require('./producto/obtener')
const ingresar = require('./producto/ingresar')
const visualizador = require('./producto/visualizador')


const router = Router()
router.use('/',ingresar,visualizador,obtener)

router.get('/', (req, res, next) => {
    try {
      res.render('menu')
    } catch (error) {
      next(error)
    }
})

router.get('*', (req, res, next) => {
  res.status(404).send({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
})

router.put('*', (req, res, next) => {
  res.status(404).send({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
})

router.post('*', (req, res, next) => {
  res.status(404).send({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
})

router.delete('*', (req, res, next) => {
  res.status(404).send({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
})

module.exports = router