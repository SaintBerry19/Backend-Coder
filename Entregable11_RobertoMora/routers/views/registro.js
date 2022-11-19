import { Router } from 'express'

const registro = Router()

registro.get('/registro', (req, res, next) => {
    res.render('registro')
})

export default registro
