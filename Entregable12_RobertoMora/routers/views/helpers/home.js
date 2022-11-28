import { Router } from 'express'
import auth from "../../../middlewares/authorization.js"
import { base_host } from '../../../bin/www.js'

const home = Router()

home.get('/home', auth, (req, res, next) => {
    const { username } = {username:{username: req.session,base_url:base_host}}
    res.render('menu',username)
})


export default home
