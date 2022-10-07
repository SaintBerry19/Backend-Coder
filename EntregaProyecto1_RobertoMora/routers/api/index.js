const { Router } = require('express')
const crearProducto = require('./producto/crear')
const obtenerProducto = require('./producto/obtener')
const actualizarProducto = require('./producto/actualizar')
const borrarProducto = require('./producto/borrar')
const uploadProducto = require('./producto/upload')
const crearCarrito = require('./carrito/crearCarrito')
const obtenerCarritos = require('./carrito/obtenerCarritos')
const agregarProductoId = require('./carrito/agregarProductoId')
const borrarCarrito = require('./carrito/borrarCarrito')
const router = Router()

    router.use('/productos', crearProducto, obtenerProducto, actualizarProducto, borrarProducto, uploadProducto)
    router.use('/carrito', crearCarrito, obtenerCarritos, agregarProductoId, borrarCarrito)

module.exports = router