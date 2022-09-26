const express = require('express')
const path = require('path')
const cors = require('cors')
const handlebars = require('express-handlebars')
const apiRouters = require('./routers/api')
const viewsRouters = require('./routers/views')
const { errorHandler } = require('./utils/errores')

const app = express()

const PORT = process.env.NODE_PORT
const ENV = process.env.NODE_ENV

app.use(cors())

app.use('/', express.static(path.join(__dirname, 'public/')))
app.use('/api/productos/avatares', express.static(path.join(__dirname, 'pictures/')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use('/api', apiRouters)
app.use('/', viewsRouters)
app.use(errorHandler)

const server = app.listen(PORT, () => {
  console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)
  console.log(`http://localhost:${server.address().port}`)
  console.log(`Environment:${ENV}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))
