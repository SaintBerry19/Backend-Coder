import ObjectId from('mongodb').ObjectId
import pick from('lodash/pick')
import filter from('lodash/filter')
import find from('lodash/find')
import remove from('lodash/remove')
import { NotFoundError } from('../utils/errores')
import productos from("./productos")

function crear(data) {
  const _id = new ObjectId()
  data.estado = 'activo'
  data.create_time = new Date()
  productos.push({ _id, ...data })
  return { insertedId: _id }
}

function obtener(query = {}) {
  const criterio = {}
  if (query.precio) {
    criterio.precio = query.precio
  }
  if (query.nombre) {
    criterio.nombre = query.nombre
  }
  return filter(productos, (producto) => {
    let status = true
    if (query.precio || query.nombre) {
      status = false
    }
    if ((query.precio && query.precio === producto.precio) || (query.nombre && query.nombre === producto.nombre)) {
      status = true
    }
    return status
  })
}

function obtenerPorId(idProducto) {
  const producto = find(productos, producto => String(producto._id) === String(idProducto))
  if (!producto) {
    throw new NotFoundError(`Producto con id ${idProducto} no encontrado.`)
  }
  return producto
}

function actualizarPorId(idProducto, dataRequest) {
  const producto = obtenerPorId(idProducto)
  const fieldTarget = [
    'nombre',
    'precio',
    'avatar',
    'estado',
  ]
  const data = {
    ...pick(dataRequest, fieldTarget),
    update_time: new Date()
  }
  return Object.assign(producto, data)
}

function borrarPorId(idProducto) {
  const producto = obtenerPorId(idProducto)
  remove(productos, producto => String(producto._id) === String(idProducto))
  return producto
}

export default {
  crear,
  obtener,
  obtenerPorId,
  actualizarPorId,
  borrarPorId,
}