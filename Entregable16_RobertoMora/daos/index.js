import {persistencia} from '../bin/www.js'

let productosDao
let carritosDao
let mensajesDao
let usuariosDao

switch (persistencia) {
    case 'json':
        const { default: ProductosDaoArchivo } = await import('./productos/ProductosDaoArchivo.js')
        const { default: CarritosDaoArchivo } = await import('./carritos/CarritosDaoArchivo.js')
        const { default: MensajesDaoArchivo } = await import('./mensajes/MensajesDaoArchivo.js')


        productosDao = new ProductosDaoArchivo()
        carritosDao = new CarritosDaoArchivo()
        mensajesDao = new MensajesDaoArchivo()
        break
      case 'mongodb':
        const { default: ProductosDaoMongoDB } = await import('./productos/ProductosDaoMongoDB.js')
        const { default: CarritosDaoMongoDB } = await import('./carritos/CarritosDaoMongoDB.js')
        const { default: MensajesDaoMongoDB } = await import('./mensajes/MensajesDaoMongoDB.js')
        const { default: UsuariosDaoMongoDB } = await import('./usuarios/UsuariosDaoMongoDB.js')

        productosDao = new ProductosDaoMongoDB()
        carritosDao = new CarritosDaoMongoDB()
        mensajesDao = new MensajesDaoMongoDB()
        usuariosDao = new UsuariosDaoMongoDB()

        break
      case 'firebase':
        const { default: ProductosDaoFireBase } = await import('./productos/ProductosDaoFireBase.js')
        const { default: CarritosDaoFireBase } = await import('./carritos/CarritosDaoFireBase.js')
        const { default: MensajesDaoFireBase } = await import('./mensajes/MensajesDaoFireBase.js')

        productosDao = new ProductosDaoFireBase()
        carritosDao = new CarritosDaoFireBase()
        mensajesDao = new MensajesDaoFireBase()
        break
    default:
        const { default: ProductosDaoMem } = await import('./productos/ProductosDaoMem.js')
        const { default: CarritosDaoMem } = await import('./carritos/CarritosDaoMem.js')
        const { default: MensajesDaoMem } = await import('./mensajes/MensajesDaoMem.js')


        productosDao = new ProductosDaoMem()
        carritosDao = new CarritosDaoMem()
        mensajesDao = new MensajesDaoMem()

}

export { productosDao, carritosDao, mensajesDao , usuariosDao} 