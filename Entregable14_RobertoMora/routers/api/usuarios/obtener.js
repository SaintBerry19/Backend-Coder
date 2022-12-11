import { Router } from 'express'
import {productosDao} from '../../../daos/index.js'
import logger from '../../../logs/logger.js'

const routerobtenerusarios = Router()

routerobtenerusarios.get('/', (req, res, next) => {
  try {
    productosDao.listarAll().then((value)=>{  
      logger.info(value)
      res.json(value)})
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

routerobtenerusarios.get('/:id', (req, res, next) => {
  try {
    productosDao.listar(req.params.id).then((value)=>{  
      logger.info(value)
      res.json(value)})
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

export default routerobtenerusarios