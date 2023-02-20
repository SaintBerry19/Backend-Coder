import { Router } from 'express'
import { base_host } from '../../../bin/www.js'
import logger from "../../../logs/logger.js";
import { crearUsuario } from '../../../controllers/views/helpers.js';

const registro = Router()

registro.get('/registro', (req, res, next) => {
    let data={base_url:base_host}
    logger.info(data)
    res.render('registro',data)
})

registro.post('/registro', (req, res, next) => {
    try {
        crearUsuario(req.body).then((data) => {
          if (data.autorizado) {
            res.render("login", data);
          } else {
            logger.info(data);
            res.render("registroerror", data);
          }
        });
      } catch (error) {
        logger.error(error);
        next(error);
      }
    });

export default registro
