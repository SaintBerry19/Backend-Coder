import { Server } from "socket.io";
import { productos } from "./db/productos.js";
import Contenedor from "./db/contenedor.js";
import * as fs from "fs";

const optionsmysql = {
  client: "mysql2",
  connection: {
    host: "localhost",
    port: 3306,
    user: "robertomora",
    password: "Senoragato90.",
    database: "ecommerce",
  },
};

const optionsqlite = {
  client: 'sqlite3',
  connection: {
    filename: './ecommerce.sqlite'
  },
}

let path = "./historial/historial.txt";
let messages = [
  {
    email: "Coder House",
    date: new Date().toLocaleString(),
    message: "Bienvenidos",
  },
];

function saveMessage(objects) {
  let file, data, contador;
  try {
    file = fs.readFileSync(path);
    try {
      data = JSON.parse(file);
      contador = data.length;
      objects.id = contador;
      data.push(objects);
      historial(path, data);
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    fs.writeFileSync(path, "[\n\t");
    objects.id = 1;
    fs.appendFileSync(path, `{\n\t\t"email": "${objects.email}",\n\t`);
    fs.appendFileSync(path, `\t"date": "${objects.date}",\n\t`);
    fs.appendFileSync(path, `\t"message": "${objects.message}",\n\t`);
    fs.appendFileSync(path, `\t"id": ${objects.id}\n\t`);
    fs.appendFileSync(path, `}\n`);
    fs.appendFileSync(path, "]");
  }
}

function historial(path, data) {
  fs.writeFileSync(path, "[\n");
  data.map((object, id) => {
    object.id = id + 1;
    fs.appendFileSync(path, `\t{\n\t\t"email": "${object.email}",\n\t`);
    fs.appendFileSync(path, `\t"date": "${object.date}",\n\t`);
    fs.appendFileSync(path, `\t"message": "${object.message}",\n\t`);
    fs.appendFileSync(path, `\t"id": ${object.id}\n\t`);
    if (id + 1 !== data.length) {
      fs.appendFileSync(path, `},\n`);
    } else {
      fs.appendFileSync(path, `}\n`);
    }
  });
  fs.appendFileSync(path, "]");
}

let io;

export default class Socket {
  static init(httpServer) {
    console.log("Configurando el socket");
    io = new Server(httpServer);
    io.on("connection", (clienteSocket) => {
      console.log("Nuevo cliente conectado", clienteSocket.id);

      clienteSocket.emit("inicio-productos", productos);

      clienteSocket.on("nuevo-producto", (data) => {
        productos.push({
          _id: clienteSocket.id + data._id,
          nombre: data.nombre,
          precio: data.precio,
          avatar: data.avatar,
          stock: data.stock,
          codigo: data.codigo,
          descripcion: data.descripcion,
        });
        io.emit("notificacion-producto", {
          _id: clienteSocket.id + data._id,
          nombre: data.nombre,
          precio: data.precio,
          avatar: data.avatar,
          stock: data.stock,
          codigo: data.codigo,
          descripcion: data.descripcion,
        });
        data = { ...data, date: new Date().toLocaleString() };
        let products = {
          _id: clienteSocket.id + data._id,
          nombre: data.nombre,
          precio: data.precio,
          avatar: data.avatar,
          stock: data.stock,
          codigo: data.codigo,
          descripcion: data.descripcion,
        };
        let table = new Contenedor("productos",optionsmysql);
        table.createTable().then(() => table.insert(products));
        let table2 = new Contenedor("productos",optionsqlite);
        table2.createTable().then(() => table2.insert(products));
      });

      clienteSocket.emit("history-messages", messages);
      clienteSocket.on("new-message", (data) => {
        messages.push({
          email: data.email,
          date: new Date().toLocaleString(),
          message: data.message,
        });
        io.emit("notification-message", {
          email: data.email,
          date: new Date().toLocaleString(),
          message: data.message,
        });
        data = { ...data, date: new Date().toLocaleString() };
        let history = {
          email: data.email,
          date: data.date,
          message: data.message,
        };
        let table = new Contenedor("messages",optionsmysql);
        table.createTable().then(() => table.insert(history));
        let table2 = new Contenedor("messages",optionsqlite);
        table2.createTable().then(() => table2.insert(history));
        saveMessage(data);
      });

      clienteSocket.on("disconection", () => {
        console.log("Se desconecto el cliente con el id", clienteSocket.id);
      });
    });
  }
}
