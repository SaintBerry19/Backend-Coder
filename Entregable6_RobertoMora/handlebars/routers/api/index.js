const { Router } = require('express')
const crear = require('./crear')
const obtener = require('./obtener')
const actualizar = require('./actualizar')
const borrar = require('./borrar')
const upload = require('./upload')

const router = Router()

router.use('/productos', crear, obtener, actualizar, borrar, upload)

module.exports = router