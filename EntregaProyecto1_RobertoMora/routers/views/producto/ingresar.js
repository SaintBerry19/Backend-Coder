const { Router } = require('express')
const router = Router()
const validatorAdminMiddleware = require('../../../middlewares/validator-admin')

router.get('/ingresar/', validatorAdminMiddleware,(req, res, next) => {
  try {
    res.render('ingresar')
  } catch (error) {
    next(error)
  }
})

module.exports = router
