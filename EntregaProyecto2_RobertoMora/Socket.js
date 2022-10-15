import {Server} from "socket.io";
import productos from "./db/productos"
let messages = [
  {
    email: 'Coder House',
    date: new Date().toLocaleString(),
    message: 'Bienvenidos'
  },
]

let io;

export class Socket {
  static init(httpServer) {
    console.log("Configurando el socket");
    io = new Server(httpServer);
    io.on("connection", (clienteSocket) => {
      console.log("Nuevo cliente conectado", clienteSocket.id);

      clienteSocket.emit("inicio-productos", productos)

      clienteSocket.on("nuevo-producto", (data) => {
        productos.push({
          _id: clienteSocket.id+data._id,
          nombre: data.nombre,
          precio: data.precio,
          avatar: data.avatar,
        });
        io.emit("notificacion-producto", {
          _id: clienteSocket.id+data._id,
          nombre: data.nombre,
          precio: data.precio,
          avatar: data.avatar,
        });
      });

      clienteSocket.emit('history-messages', messages)
      clienteSocket.on('new-message', (data) => {
          messages.push(
            {
              email: data.email,
              date: new Date().toLocaleString(),
              message: data.message
            }
          )
          io.emit('notification-message', {
            
              email: data.email,
              date: new Date().toLocaleString(),
              message: data.message
            }
          )
        })
        clienteSocket.on('disconection', () => {
          console.log('Se desconecto el cliente con el id', clienteSocket.id)
        })
    });
  }
}
