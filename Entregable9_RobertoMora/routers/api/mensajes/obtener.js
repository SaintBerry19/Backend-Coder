import { Router } from 'express'
import {mensajesDao} from '../../../daos/index.js'

const routerobtenermensajes = Router()

routerobtenermensajes.get('/', (req, res, next) => {
  try {
    mensajesDao.listarAll().then((value)=>{  res.json(value)})
  } catch (error) {
    next(error)
  }
})

routerobtenermensajes.get('/:id', (req, res, next) => {
  try {
    mensajesDao.listar(req.params.id).then((value)=>{  res.json(value)})
  } catch (error) {
    next(error)
  }
})

export default routerobtenermensajes