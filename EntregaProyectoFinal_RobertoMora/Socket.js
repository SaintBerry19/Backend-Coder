import { Server } from "socket.io";
import ContenedorSQL from "./contenedores/ContenedorSQL.js";
import * as fs from "fs";
import { productosDao,mensajesDao } from "./models/daos/index.js";
import normalizer from "./normalization.js"
import axios from 'axios';
import {base_host} from './bin/www.js'

let mensajes = await mensajesDao.listarAll();
let productos = await productosDao.listarAll();

mensajes.forEach((mensaje) =>{
  let date= mensaje.createdAt.toLocaleString()
  mensaje.createdAt= date
})
const messages = mensajes

let io;

export default class Socket {
  static init(httpServer) {
    io = new Server(httpServer);
    io.on("connection", (clienteSocket) => {
      console.log("Nuevo cliente conectado", clienteSocket.id);

      clienteSocket.emit("inicio-productos", productos);

      clienteSocket.on("nuevo-producto", (data) => {
        productos.push({
          _id: data._id,
          nombre: data.nombre,
          precio: data.precio,
          avatar: data.avatar,
          stock: data.stock,
          codigo: data.codigo,
          descripcion: data.descripcion,
        });
        io.emit("notificacion-producto", {
          _id: data._id,
          nombre: data.nombre,
          precio: data.precio,
          avatar: data.avatar,
          stock: data.stock,
          codigo: data.codigo,
          descripcion: data.descripcion,
        });
        data = { ...data, date: new Date().toLocaleString() };
        let producto = {
          nombre: data.nombre,
          precio: data.precio,
          avatar: data.avatar,
          stock: data.stock,
          codigo: data.codigo,
          descripcion: data.descripcion,
        };

        productosDao.guardar(producto);
      });

      clienteSocket.emit("history-messages", messages,normalizer(messages));
      clienteSocket.on("new-message", (data) => {
        messages.push({
          author: {
            id: data.author.email,
            nombre: data.author.nombre,
            apellido: data.author.apellido,
            edad: data.author.edad,
            alias: data.author.alias,
            avatar: data.author.avatar,
          },
          createdAt: new Date().toLocaleString(),
          message: data.message,
        });
        io.emit("notification-message",{
          author: {
            id: data.author.email,
            nombre: data.author.nombre,
            apellido: data.author.apellido,
            edad: data.author.edad,
            alias: data.author.alias,
            avatar: data.author.avatar,
          },
          createdAt: new Date().toLocaleString(),
          message: data.message,
        },normalizer(messages));
        axios
          .post(`${base_host}/api/mensajes/`,data)
          .then((response) => {
            response.status
          })
          .catch((error) => {
            console.log(error)
          });
      });

      clienteSocket.on("disconection", () => {
        console.log("Se desconecto el cliente con el id", clienteSocket.id);
      });
    });
  }
}
