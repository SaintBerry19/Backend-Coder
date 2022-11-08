import { Router } from 'express'
import validatorAdminMiddleware from '../../../middlewares/validator-admin.js'

const  ingresar = Router()
ingresar.get('/ingresar/', validatorAdminMiddleware,(req, res, next) => {
  try {
    res.render('ingresar')
  } catch (error) {
    next(error)
  }
})

export default ingresar
