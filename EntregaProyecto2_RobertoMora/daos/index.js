let productosDao
let carritosDao

switch (process.env.TIPO_PERSISTENCIA) {
    case 'json':
        const { default: ProductosDaoArchivo } = await import('./productos/ProductosDaoArchivo.js')
        const { default: CarritosDaoArchivo } = await import('./carritos/CarritosDaoArchivo.js')

        productosDao = new ProductosDaoArchivo()
        carritosDao = new CarritosDaoArchivo()
        break
      case 'mongodb':
        const { default: ProductosDaoMongoDB } = await import('./productos/ProductosDaoMongoDB.js')
        const { default: CarritosDaoMongoDB } = await import('./carritos/CarritosDaoMongoDB.js')

        productosDao = new ProductosDaoMongoDB()
        carritosDao = new CarritosDaoMongoDB()
        break
      case 'firebase':
        const { default: ProductosDaoFireBase } = await import('./productos/ProductosDaoFireBase.js')
        const { default: CarritosDaoFireBase } = await import('./carritos/CarritosDaoFireBase.js')

        productosDao = new ProductosDaoFireBase()
        carritosDao = new CarritosDaoFireBase()
        break
    default:
        const { default: ProductosDaoMem } = await import('./productos/ProductosDaoMem.js')
        const { default: CarritosDaoMem } = await import('./carritos/CarritosDaoMem.js')

        productosDao = new ProductosDaoMem()
        carritosDao = new CarritosDaoMem()
}

export { productosDao, carritosDao }