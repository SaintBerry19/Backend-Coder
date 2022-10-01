import { Router } from ('express')
import crear from ('./crear')
import obtener from ('./obtener')
import actualizar from ('./actualizar')
import borrar from ('./borrar')
import upload from ('./upload')

const router = Router()

router.use('/productos', crear, obtener, actualizar, borrar, upload)

export default router