import ContenedorMemoria from "../../../../contenedores/ContenedorMemoria.js";

class CarritosDaoMem extends ContenedorMemoria {

  guardar(carrito = { productos: [] }) {
    return super.guardar(carrito);
  }


}

export default CarritosDaoMem;
