import { Router } from 'express'
import {mensajesDao} from '../../../daos/index.js'
import logger from '../../../logs/logger.js'


const routerobtenermensajes = Router()

routerobtenermensajes.get('/', (req, res, next) => {
  try {
    mensajesDao.listarAll().then((value)=>{  
      logger.info(value)
      res.json(value)})
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

routerobtenermensajes.get('/:id', (req, res, next) => {
  try {
    mensajesDao.listar(req.params.id).then((value)=>{  
      logger.info(value)
      res.json(value)})
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

export default routerobtenermensajes