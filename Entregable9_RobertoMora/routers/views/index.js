import  { Router } from 'express'
import  obtener from './producto/obtener.js'
import  ingresar from './producto/ingresar.js'
import  visualizador from './producto/visualizador.js'
import  test from './producto/test.js'

const routerviews = Router()
routerviews.use('/',ingresar,visualizador,obtener,test)

routerviews.get('/', (req, res, next) => {
  try {
    res.render('menu')
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