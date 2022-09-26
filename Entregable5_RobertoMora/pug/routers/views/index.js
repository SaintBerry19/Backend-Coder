const { Router } = require('express')
const obtener = require('./obtener')

const router = Router()
router.use('/productos', obtener)

module.exports = router