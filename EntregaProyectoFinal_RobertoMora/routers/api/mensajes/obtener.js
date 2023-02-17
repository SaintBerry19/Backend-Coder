import { Router } from 'express'
import { obtenerMensaje, obtenerMensajes } from '../../../controllers/api/mensajes.js'
import logger from '../../../logs/logger.js'
import authorizationJwt from '../../../middlewares/authorization-jwt.js'


const routerobtenermensajes = Router()

routerobtenermensajes.get('/',authorizationJwt, (req, res, next) => {
  try {
    obtenerMensajes().then((value)=>{  
      logger.info(value)
      res.json(value)})
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

routerobtenermensajes.get('/:id', (req, res, next) => {
  try {
   obtenerMensaje(req.params.id).then((value)=>{  
      logger.info(value)
      res.json(value)})
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

export default routerobtenermensajes