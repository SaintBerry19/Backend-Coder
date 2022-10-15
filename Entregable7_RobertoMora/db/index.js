import ObjectId from 'mongodb'
import pick from 'lodash'
import filter from 'lodash'
import find from 'lodash'
import remove from 'lodash'
import NotFoundError  from '../utils/errores.js'



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
    'descipcion',
    'codigo',
    'stock',
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