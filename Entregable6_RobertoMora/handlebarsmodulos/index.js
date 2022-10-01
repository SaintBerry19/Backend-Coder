import express from 'express'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars'
import apiRouters from './routers/api'
import viewsRouters from './routers/views'
import errorHandler from './utils/errores'
import logger from 'morgan'

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, 'public/')))
app.use('/api/avatares', express.static(path.join(__dirname, 'pictures/')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(logger('dev'));

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use('/api', apiRouters)
app.use('/', viewsRouters)
app.use(errorHandler)

// const server = app.listen(PORT, () => {
//   console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)
//   console.log(`http://localhost:${server.address().port}`)
//   console.log(`Environment:${ENV}`)
// })

// server.on("error", error => console.log(`Error en servidor ${error}`))

export default app