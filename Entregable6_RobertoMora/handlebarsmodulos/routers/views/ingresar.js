import { Router }  from('express')
const router = Router()

router.get('/ingresar/', (req, res, next) => {
  try {
    res.render('ingresar')
  } catch (error) {
    next(error)
  }
})

export default router
