import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import handlebars from "express-handlebars";
import routerapi from "./routers/api/index.js";
import routerviews from "./routers/views/index.js";
import path from "path";
import { fileURLToPath } from "url";
import expressSession from "express-session";
import MongoStore from "connect-mongo"


// import sessionFileStore from 'session-file-store'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// const FileStore = sessionFileStore(expressSession)

app.use(
  expressSession({
    // store: new FileStore({
    //   path: "../sessions", // El directorio donde se almacenarán los archivos de la sesión. El valor predeterminado es ./sessions
    //   ttl: 600, // Tiempo de vida de la sesión en segundos. Predeterminado a 3600
    //   retries: 2, // El número de reintentos para obtener datos de sesión de un archivo de sesión. Predeterminado a 5
    // }),
    store: new MongoStore({
      mongoUrl:(process.env.MONGODB_URI),
      ttl: 600,
    }),
    secret: "3biXMV8#m5s7",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cors());
app.use(express.static(path.join(__dirname, "public/")));
app.use("/api/avatares", express.static(path.join(__dirname, "pictures/")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use("/api", routerapi);
app.use("/", routerviews);

// const server = app.listen(PORT, () => {
//   console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)
//   console.log(`http://localhost:${server.address().port}`)
//   console.log(`Environment:${ENV}`)
// })

// server.on("error", error => console.log(`Error en servidor ${error}`))
export default app;
