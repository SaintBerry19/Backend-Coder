const BD = require('../db')

class ProductosController {

  static crear(data) {
    const logPrefix = '[ProductosController][crear]'
    try {
      console.log(`${logPrefix} intentando crear Producto.`)
      const result = BD.crear(data)
      const producto = BD.obtenerPorId(result.insertedId)
      console.log(`${logPrefix} Producto creado con éxito.`)
      return producto
    } catch (error) {
      console.error(`${logPrefix} Ah ocurrido un error: ${error.message}`)
      throw error
    }
  }

  static obtener(query) {
    const logPrefix = '[ProductosController][obtener]'
    try {
      console.log(`${logPrefix} intentando obtener Productos con filtro ${JSON.stringify(query)}.`)
      const producto = BD.obtener(query)
      console.log(`${logPrefix} Productos encontrados con éxito.`)
      return producto
    } catch (error) {
      console.error(`${logPrefix} Ah ocurrido un error: ${error.message}`)
      throw error
    }
  }

  static obtenerPorId(idProducto) {
    const logPrefix = '[ProductosController][obtenerPorId]'
    try {
      console.log(`${logPrefix} intentando obtener Producto ${idProducto}.`)
      const producto = BD.obtenerPorId(idProducto)
      console.log(`${logPrefix} Producto ${idProducto} encontrado con éxito.`)
      return producto
    } catch (error) {
      console.error(`${logPrefix} Ah ocurrido un error: ${error.message}`)
      throw error
    }
  }

  static actualizarPorId(idProducto, data) {
    const logPrefix = '[ProductosController][actualizarPorId]'
    try {
      console.log(`${logPrefix} intentando actualizar Producto ${idProducto}.`)
      BD.actualizarPorId(idProducto, data)
      console.log(`${logPrefix} Producto ${idProducto} actualizado con éxito.`)
    } catch (error) {
      console.log(`${logPrefix} Ah ocurrido un error: ${error.message}`)
      throw error
    }
  }

  static borrarPorId(idProducto) {
    const logPrefix = '[ProductosController][borrarPorId]'
    try {
      console.log(`${logPrefix} intentando borrar Producto ${idProducto}.`)
      BD.borrarPorId(idProducto)
      console.log(`${logPrefix} Producto ${idProducto} borrado con éxito.`)
    } catch (error) {
      console.error(`${logPrefix} Ah ocurrido un error: ${error.message}`)
      throw error
    }
  }

  static actualizarAvatarPorId(idProducto, file) {
    const logPrefix = '[ProductosController][actualizarAvatarPorId]'
    try {
      const avatar = `${process.env.BASE_HOST}/api/avatares/${file.filename}`
      console.log(`${logPrefix} intentando actualizar avatar de Producto ${idProducto}.`)
      ProductosController.actualizarPorId(idProducto, { avatar })
      console.log(`${logPrefix} avatar de Producto ${idProducto} actualizado con éxito.`)
      return { avatar }
    } catch (error) {
      console.log(`${logPrefix} ${error.message}`)
      throw error
    }
  }
}

module.exports = ProductosController