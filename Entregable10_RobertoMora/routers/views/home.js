import { Router } from 'express'
import auth from "../../middlewares/authorization.js"

const home = Router()

home.get('/home', auth, (req, res, next) => {
    const { username } = {username:{username: req.session}}
    res.render('menu',username)
})


export default home
