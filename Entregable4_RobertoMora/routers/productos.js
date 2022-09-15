const express = require("express");
const { Router } = express;

const router = Router();

const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
}

let productos = [
  {
    id: 1,
    title: "Jabon",
    price: "35",
    url: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fdefinicion.de%2Fwp-content%2Fuploads%2F2009%2F06%2Fproducto.png&imgrefurl=https%3A%2F%2Fdefinicion.de%2Fproducto%2F&tbnid=8bnIkwWbu7uGCM&vet=12ahUKEwju5OHdk_n5AhUGnWoFHUukAnsQMygBegUIARC-AQ..i&docid=kyhCT_35T45iEM&w=640&h=457&q=producto&ved=2ahUKEwju5OHdk_n5AhUGnWoFHUukAnsQMygBegUIARC-AQ"
  },
  {
    id: 2,
    title: "Esponja",
    price: "35",
    url: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fdefinicion.de%2Fwp-content%2Fuploads%2F2009%2F06%2Fproducto.png&imgrefurl=https%3A%2F%2Fdefinicion.de%2Fproducto%2F&tbnid=8bnIkwWbu7uGCM&vet=12ahUKEwju5OHdk_n5AhUGnWoFHUukAnsQMygBegUIARC-AQ..i&docid=kyhCT_35T45iEM&w=640&h=457&q=producto&ved=2ahUKEwju5OHdk_n5AhUGnWoFHUukAnsQMygBegUIARC-AQ"
  },
  {
    id: 3,
    title: "Escoba",
    price: "75",
    url: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fdefinicion.de%2Fwp-content%2Fuploads%2F2009%2F06%2Fproducto.png&imgrefurl=https%3A%2F%2Fdefinicion.de%2Fproducto%2F&tbnid=8bnIkwWbu7uGCM&vet=12ahUKEwju5OHdk_n5AhUGnWoFHUukAnsQMygBegUIARC-AQ..i&docid=kyhCT_35T45iEM&w=640&h=457&q=producto&ved=2ahUKEwju5OHdk_n5AhUGnWoFHUukAnsQMygBegUIARC-AQ"
  },
  {
    id: 4,
    title: "Trapeador",
    price: "85",
    url: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fdefinicion.de%2Fwp-content%2Fuploads%2F2009%2F06%2Fproducto.png&imgrefurl=https%3A%2F%2Fdefinicion.de%2Fproducto%2F&tbnid=8bnIkwWbu7uGCM&vet=12ahUKEwju5OHdk_n5AhUGnWoFHUukAnsQMygBegUIARC-AQ..i&docid=kyhCT_35T45iEM&w=640&h=457&q=producto&ved=2ahUKEwju5OHdk_n5AhUGnWoFHUukAnsQMygBegUIARC-AQ"
  },
];

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
