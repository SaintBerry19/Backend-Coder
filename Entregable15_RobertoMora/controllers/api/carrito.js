import { carritosDao,productosDao, usuariosDao  } from "../../daos/index.js";
import { base_host } from "../../bin/www.js";


export async function crearCarrito() {
  let carrito = carritosDao.guardar();
  return carrito;
}

export async function obtenerCarritos(query){
    let value = carritosDao.listarAll(query)
    return value
}

export async function obtenerCarrito(id){
    let value = carritosDao.listar(id)
    return value
}

export async function actualizarCarrito(){

}

export async function removerCarrito(idcarrito,idproducto,username){
      let carrito = await carritosDao.listar(idcarrito)
      let result = carrito[0].productos.filter(
        (producto) => producto._id.toString() !== idproducto
      );
      let data = { productos: result };
      let actualizar = await carritosDao.actualizar(idcarrito, data)
      let value= await usuariosDao.buscar(username)
      let avatar = value[0].avatar;
            const username2 = {
              username: {
                username: req.session.username,
                base_url: base_host,
                avatar: avatar,
              },
            };
        let cambio ={
            username: username2,
            actualizar: actualizar,
        }
        return cambio;
    }