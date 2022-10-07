const { Router } = require('express')
const router = Router()

router.get('/ingresar/', (req, res, next) => {
  try {
    res.render('ingresar')
  } catch (error) {
    next(error)
  }
})

module.exports = router
