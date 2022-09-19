const express = require("express");
const { Router } = express;
let productos = require("../productos/productos")

const router = Router();

const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
}

router.post('/productos', (req, res) => {
  let { body : data } = req
  data = { id: productos.length+1, ...data }
  productos.push(data)
  res.status(200).json(data)
})

router.get('/productos', (_, res) => {
  res.status(200).json(productos)
})

router.get('/productos/:id', (req, res) => {
  let id = req.params.id
  let object = null
  id = parseInt(id)
  for (let index = 0; index < productos.length; index++) {
    if (productos[index].id == id) {
      object = productos[index];
      break
    }
  }
  if (object) {
    res.status(STATUS_CODE.OK).send(object)
  }
  else {
  let resultado = {error: "producto no encontrado"}
  res.status(STATUS_CODE.BAD_REQUEST).json(resultado)
  return}
})

router.put('/productos/:id', (req, res) => {
  let id = req.params.id
  let flag = false
  id = parseInt(id)
  for (let index = 0; index < productos.length; index++) {
    if (productos[index].id == id) {
      let { body : data } = req
      data = { id: id, ...data }
      productos[index]=data
      flag = true
      break
    }
  }
  if (flag) {
    res.status(STATUS_CODE.OK).send('Se recibio y actualizo el producto')
  }
  else {
  let resultado = {error: "producto no encontrado"}
  res.status(STATUS_CODE.BAD_REQUEST).json(resultado)
  return}
})

router.delete('/productos/:id', (req, res) => {
  let id = req.params.id
  let flag = false
  id = parseInt(id)
  for (let index = 0; index < productos.length; index++) {
    if (productos[index].id == id) {
      productos = productos.filter((item) => item.id != id);
      flag = true
      break
    }
  }
  if (flag) {
    res.status(STATUS_CODE.OK).send('Se elimino el producto deseado')
  }
  else {
  let resultado = {error: "producto no encontrado"}
  res.status(STATUS_CODE.BAD_REQUEST).json(resultado)
  return}
})

module.exports = router;
