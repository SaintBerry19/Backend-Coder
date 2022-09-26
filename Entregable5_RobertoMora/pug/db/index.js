const ObjectId = require('mongodb').ObjectId
const pick = require('lodash/pick')
const filter = require('lodash/filter')
const find = require('lodash/find')
const remove = require('lodash/remove')
const { NotFoundError } = require('../utils/errores')
let productos = require("./productos")

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

module.exports = {
  crear,
  obtener,
  obtenerPorId,
  actualizarPorId,
  borrarPorId,
}