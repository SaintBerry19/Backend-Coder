import { Router } from 'express'
import routercrear from './producto/crear.js'
import routerobtener from './producto/obtener.js'
import routeractualizar from './producto/actualizar.js'
import routerborrar from './producto/borrar.js'
import routerupload from './producto/upload.js'
import routercrearcarrito from './carrito/crearCarrito.js'
import routerobtenercarrito from './carrito/obtenerCarritos.js'
import routeragregarcarrito from './carrito/agregarProductoId.js'
import routerborrercarrito from './carrito/borrarCarrito.js'

const routerapi = Router()


    routerapi.use('/productos', routercrear, routerobtener, routeractualizar, routerborrar, routerupload)
    routerapi.use('/carrito', routercrearcarrito, routerobtenercarrito, routeragregarcarrito, routerborrercarrito)
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