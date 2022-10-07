const express = require('express')
const path = require('path')
const cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const handlebars = require('express-handlebars')
const apiRouters = require('./routers/api')
const viewsRouters = require('./routers/views')
const { errorHandler } = require('./utils/errores')
require('dotenv').config()

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

module.exports = app