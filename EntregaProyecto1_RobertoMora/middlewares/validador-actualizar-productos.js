const Joi = require('joi')
const { BadRequestError } = require('../utils/errores')

const productoSchema = Joi.object({
  nombre: Joi.string()
    .min(3)
    .max(30)
    .trim(true),
  precio: Joi.number()
    .integer()
})

module.exports = async function validadorActualizarProductoMiddleware(req, res, next) {
  const logPrefix = '[validadorActualizarProductoMiddleware]'
  try {
    console.log(`${logPrefix} intentando validar body producto...`)
    req.body = await productoSchema.validateAsync(req.body)
    console.log(`${logPrefix} validación body producto exitosa.`)
    next()
  } catch (error) {
    console.error(`${logPrefix} validación fallida de body producto: ${error.message}`)
    next(new BadRequestError('Ocurrio un error validando', error))
  }
}