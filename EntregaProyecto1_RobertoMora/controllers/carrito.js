import {
  crearCarrito,
  obtenerCarritos,
  borrarCarritoId,
  argregarProductoId,
  borrarPorIdCarrito,
  obtenerCarritoPorId,
} from '../db/carritos.js'

export default class CarritosController {

  static crear() {
    const logPrefix = '[CarritosController][crear]'
    try {
      console.log(`${logPrefix} intentando crear Carrito.`)
      const result = crearCarrito()
      const carrito = obtenerCarritoPorId(result.insertedId)
      console.log(`${logPrefix} Carrito ${result.insertedId} creado con éxito . `)
      return carrito
    } catch (error) {
      console.error(`${logPrefix} Ah ocurrido un error: ${error.message}`)
      throw error
    }
  }

  static obtener(query) {
    const logPrefix = '[CarritosController][obtener]'
    try {
      console.log(`${logPrefix} intentando obtener Carrito con filtro ${JSON.stringify(query)}.`)
      const carrito = obtenerCarritos(query)
      console.log(`${logPrefix} Carrito encontrados con éxito.`)
      return carrito
    } catch (error) {
      console.error(`${logPrefix} Ah ocurrido un error: ${error.message}`)
      throw error
    }
  }

  static obtenerPorId(idCarrito) {
    const logPrefix = '[CarritosController][obtenerPorId]'
    try {
      console.log(`${logPrefix} intentando obtener Carrito ${idCarrito}.`)
      const carrito = obtenerCarritoPorId(idCarrito)
      console.log(`${logPrefix} Producto ${idCarrito} encontrado con éxito.`)
      return carrito
    } catch (error) {
      console.error(`${logPrefix} Ah ocurrido un error: ${error.message}`)
      throw error
    }
  }

  static agregarPorId(idCarrito,idProducto) {
    const logPrefix = '[CarritosController][agregarPorId]'
    try {
      console.log(`${logPrefix} intentando agregar Producto ${idProducto}.`)
      argregarProductoId(idCarrito,idProducto)
      console.log(`${logPrefix} Producto ${idProducto} agregado con éxito al carrito con id ${idCarrito}.`)
    } catch (error) {
      console.log(`${logPrefix} Ah ocurrido un error: ${error.message}`)
      throw error
    }
  }

  static borrarCarrito(idCarrito) {
    const logPrefix = '[CarritosController][borrarCarrito]'
    try {
      console.log(`${logPrefix} intentando borrar Carrito.`)
      borrarCarritoId(idCarrito)
      console.log(`${logPrefix} Carrito borrado con éxito.`)
    } catch (error) {
      console.error(`${logPrefix} Ah ocurrido un error: ${error.message}`)
      throw error
    }
  }

  static borrarProductoPorId(idCarrito,idProducto) {
    const logPrefix = '[CarritosController][borrarProductoPorId]'
    try {
      console.log(`${logPrefix} intentando borrar Producto ${idProducto} del carrito ${idCarrito}.`)
      borrarPorIdCarrito(idCarrito,idProducto)
      console.log(`${logPrefix} Producto ${idProducto} borrado con éxito.`)
    } catch (error) {
      console.error(`${logPrefix} Ah ocurrido un error: ${error.message}`)
      throw error
    }
  }

}
