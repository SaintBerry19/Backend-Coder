import { Router }  from('express')
import obtener  from('./obtener')
import ingresar  from('./ingresar')
import visualizador  from('./visualizador')

const router = Router()
router.use('/',obtener,ingresar,visualizador)
router.get('/', (req, res, next) => {
    try {
      res.render('menu')
    } catch (error) {
      next(error)
    }
  })


export default router