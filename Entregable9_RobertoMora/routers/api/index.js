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

const routerapi = Router()


    routerapi.use('/productos', routercrear, routerobtener, routeractualizar, routerborrar)
    routerapi.use('/mensajes', routercrearmensajes, routerobtenermensajes, routeractualizarmensajes, routerborrarmensajes)
    routerapi.use('/carrito', routercrearcarrito, routerobtenercarrito, routeractualizarcarrito, routerborrercarrito)
    routerapi.get('*', (req, res) => {
        res.status(404).send({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
      })

    routerapi.put('*', (req, res) => {
        res.status(404).send({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
      })

    routerapi.post('*', (req, res) => {
        res.status(404).send({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
      })

    routerapi.delete('*', (req, res) => {
        res.status(404).send({ error : -2, descripcion: `ruta ${req.url} método ${req.method}  no implementada` })
      })


export default routerapi