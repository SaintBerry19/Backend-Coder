const Joi = require('joi')
const { BadRequestError } = require('../utils/errores')

const productoSchema = Joi.object({
  nombre: Joi.string()
    .min(3)
    .max(30)
    .trim(true)
    .required(),
  precio: Joi.number()
    .integer()
    .required(),
  avatar: Joi.string()
  .min(3)
  .max(3000)
  .trim(true)
  .allow(''),
})

module.exports = async function validadorCrearProductoMiddleware(req, res, next) {
  const logPrefix = '[validadorCrearProductoMiddleware]'
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