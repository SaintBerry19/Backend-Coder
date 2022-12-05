import {productosDao} from '../daos/index.js'

export default async function validadorProductoExisteMiddleware(req, res, next) {
  const logPrefix = '[validadorProductoExisteMiddleware]'
  const prodcutoId = req.params.id
  try {
    console.log(`${logPrefix} intentando obtener producto ${prodcutoId}...`)
    req.producto = await productosDao.listar(prodcutoId)
    console.log(`${logPrefix} validación exitosa de producto ${prodcutoId}.`)
    next()
  } catch (error) {
    console.error(`${logPrefix} validación fallida de producto ${prodcutoId}: ${error.message}`)
    next(error)
  }
}