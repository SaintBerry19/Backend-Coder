const { Router } = require('express')
const obtener = require('./producto/obtener')
const ingresar = require('./producto/ingresar')
const visualizador = require('./producto/visualizador')


const router = Router()
router.use('/',ingresar,visualizador)
router.use('/',obtener)

router.get('/', (req, res, next) => {
    try {
      res.render('menu')
    } catch (error) {
      next(error)
    }
  })


module.exports = router