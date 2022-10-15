import { Router } from 'express'
import multer  from 'multer'
import actualizarAvatarPorId from '../../../controllers/productos.js'
import BadRequestError from '../../../utils/errores.js'
import validadorProductoExisteMiddleware from '../../../middlewares/validator-producto-existe.js'
import validatorAdminMiddleware from '../../../middlewares/validator-admin.js'

const routerupload = Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'pictures/')
  },
  filename: function (req, file, cb) {
    const productoId = req.producto._id
    const extArray = file.mimetype.split('/')
    const extension = extArray[extArray.length - 1]
    cb(null, `${productoId}.${extension}`)
  }
})

const upload = multer({ storage })

routerupload.put('/:id/avatar',validatorAdminMiddleware,
  validadorProductoExisteMiddleware,
  upload.single('avatar'),
  (req, res, next) => {
    try {
      if (!req.file) {
        throw new BadRequestError('Debe subir una archivo valido para esta acción.')
      }
      const result = actualizarAvatarPorId(req.producto._id, req.file)
      res.json(result)
    } catch (error) {
      next(error)
    }
})

export default routerupload