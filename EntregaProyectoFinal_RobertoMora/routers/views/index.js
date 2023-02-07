import  { Router } from 'express'
import  obtener from './producto/obtener.js'
import  ingresar from './producto/ingresar.js'
import  visualizador from './producto/visualizador.js'
import  test from './producto/test.js'
import login from '../views/helpers/login.js'
import home from '../views/helpers/home.js'
import info from '../views/helpers/info.js'
import logout from '../views/helpers/logout.js'
import registro from '../views/helpers/registro.js'
import carrito from '../views/carrito/obtener.js'
import user from '../views/helpers/user.js'
import logger from '../../logs/logger.js'

const routerviews = Router()
routerviews.use('/',ingresar,visualizador,obtener,test,login,home,logout,registro,info,user,carrito)

routerviews.get('/', (req, res, next) => {
  try {
    logger.info({msg:'login'})
    res.render('login')
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

routerviews.get('*', (req, res) => {
logger.warn({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
res.status(404).send({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
})

routerviews.put('*', (req, res) => {
logger.warn({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
res.status(404).send({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
})

routerviews.post('*', (req, res) => {        
logger.warn({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
res.status(404).send({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
})

routerviews.delete('*', (req, res) => {
logger.warn({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
res.status(404).send({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
})


export default routerviews