import express from 'express'
import cors from 'cors'
import cookieParser  from 'cookie-parser';
import morgan from 'morgan';
import handlebars from 'express-handlebars'
import routerapi from './routers/api/index.js'
import routerviews from './routers/views/index.js'
import  errorHandler  from './utils/errores.js'
import path from 'path'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

// import dotenv from "dotenv/config"

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, 'public/')))
app.use('/api/avatares', express.static(path.join(__dirname, 'pictures/')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(morgan('dev'));

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use('/api', routerapi)
app.use('/', routerviews)

// const server = app.listen(PORT, () => {
//   console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)
//   console.log(`http://localhost:${server.address().port}`)
//   console.log(`Environment:${ENV}`)
// })

// server.on("error", error => console.log(`Error en servidor ${error}`))
 export default app