import { Router } from 'express'
import routercrear from './producto/crear.js'
import routerobtener from './producto/obtener.js'
import routeractualizar from './producto/actualizar.js'
import routerborrar from './producto/borrar.js'
import routercrearmensajes from './mensajes/crear.js'
import routerobtenermensajes from './mensajes/obtener.js'
import routeractualizarmensajes from './mensajes/actualizar.js'
import routerborrarmensajes from './mensajes/borrar.js'
import routercrearcarrito from './carrito/crearCarrito.js'
import routerobtenercarrito from './carrito/obtenerCarritos.js'
import routeractualizarcarrito from './carrito/actualizarCarrito.js'
import routerborrercarrito from './carrito/borrarCarrito.js'
import routercrearusarios from './usuarios/crear.js'
import routerobtenerusarios from './usuarios/obtener.js'
import routeractualizarusuarios from './usuarios/actualizar.js'
import routerborrarusuarios from './usuarios/borrar.js'
import random from './helpers/random.js'
import logger from '../../logs/logger.js'
import loginapi from './helpers/login.js'
import logoutapi from './helpers/logout.js'


const routerapi = Router()
    
    routerapi.use('/login', loginapi)
    routerapi.use('/logout', logoutapi)
    routerapi.use('/random', random)
    routerapi.use('/productos', routercrear, routerobtener, routeractualizar, routerborrar)
    routerapi.use('/mensajes', routercrearmensajes, routerobtenermensajes, routeractualizarmensajes, routerborrarmensajes)
    routerapi.use('/carrito', routercrearcarrito, routerobtenercarrito, routeractualizarcarrito, routerborrercarrito)
    routerapi.use('/usuarios', routercrearusarios, routerobtenerusarios, routeractualizarusuarios, routerborrarusuarios)
    routerapi.get('*', (req, res) => {
        logger.warn({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
        res.status(404).send({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
      })

    routerapi.put('*', (req, res) => {
        logger.warn({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
        res.status(404).send({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
      })

    routerapi.post('*', (req, res) => {
        logger.warn({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
        res.status(404).send({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
      })

    routerapi.delete('*', (req, res) => {
        logger.warn({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
        res.status(404).send({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
      })


export default routerapi