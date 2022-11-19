import  { Router } from 'express'
import  obtener from './producto/obtener.js'
import  ingresar from './producto/ingresar.js'
import  visualizador from './producto/visualizador.js'
import  test from './producto/test.js'
import login from '../views/login.js'
import home from '../views/home.js'
import logout from '../views/logout.js'
import registro from '../views/registro.js'


const routerviews = Router()
routerviews.use('/',ingresar,visualizador,obtener,test,login,home,logout,registro)

routerviews.get('/', (req, res, next) => {
  try {
    res.render('login')
  } catch (error) {
    next(error)
  }
})

routerviews.get('*', (req, res) => {
res.status(404).send({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
})

routerviews.put('*', (req, res) => {
res.status(404).send({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
})

routerviews.post('*', (req, res) => {
res.status(404).send({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
})

routerviews.delete('*', (req, res) => {
res.status(404).send({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
})


export default routerviews