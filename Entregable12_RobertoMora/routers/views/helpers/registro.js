import { Router } from 'express'
import { base_host } from '../../../bin/www.js'

const registro = Router()

registro.get('/registro', (req, res, next) => {
    let data={base_url:base_host}
    res.render('registro',data)
})

export default registro
