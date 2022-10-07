const { Router } = require('express')
const obtener = require('./obtener')
const ingresar = require('./ingresar')
const visualizador = require('./visualizador')


const router = Router()
router.use('/',obtener,ingresar,visualizador)
router.get('/', (req, res, next) => {
    try {
      res.render('menu')
    } catch (error) {
      next(error)
    }
  })


module.exports = router