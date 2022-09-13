import {lista, randomproduct} from "./functions.js";
import express from "express";

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

app.get("/", (req, res) => {
  res.send('<h1 style="color: blue">Bienvenidos al servidor express</h1>');
});

app.get("/productos", (req, res) => {
  res.send(`${JSON.stringify(lista)}`);
});

app.get("/productoRandom", (req, res) => {
  res.send(`${JSON.stringify(randomproduct)}`);
});
