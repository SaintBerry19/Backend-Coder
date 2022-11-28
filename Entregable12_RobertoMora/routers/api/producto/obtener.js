import { Router } from 'express'
import {productosDao} from '../../../daos/index.js'

const routerobtener = Router()

routerobtener.get('/', (req, res, next) => {
  try {
    productosDao.listarAll().then((value)=>{  res.json(value)})
  } catch (error) {
    next(error)
  }
})

routerobtener.get('/:id', (req, res, next) => {
  try {
    productosDao.listar(req.params.id).then((value)=>{  res.json(value)})
  } catch (error) {
    next(error)
  }
})

export default routerobtener