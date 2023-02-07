import { Router } from 'express'
import { obtenerUsuario, obtenerUsuarios } from '../../../controllers/api/usuarios.js'
import logger from '../../../logs/logger.js'

const routerobtenerusarios = Router()

routerobtenerusarios.get('/', (req, res, next) => {
  try {
    obtenerUsuarios().then((value)=>{  
      logger.info(value)
      res.json(value)})
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

routerobtenerusarios.get('/:id', (req, res, next) => {
  try {
    obtenerUsuario(req.params.id).then((value)=>{  
      logger.info(value)
      res.json(value)})
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

export default routerobtenerusarios