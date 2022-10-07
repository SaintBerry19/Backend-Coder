const { Router } = require('express')
const multer  = require('multer')
const {actualizarAvatarPorId} = require('../../controllers/productos')
const {BadRequestError} = require('../../utils/errores')
const validadorProductoExisteMiddleware = require('../../middlewares/validator-producto-existe')

const router = Router()

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

router.put('/:id/avatar',
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

module.exports = router