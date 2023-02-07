import crypto from 'crypto'

class Producto {
  constructor({ id, nombre, precio, codigo, descripcion }) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.codigo = codigo;
    this.descripcion = descripcion;
  }
}

const productosMap = {};

export function createProducto({ data }) {
  const id = generateId();
  const newProduct = new Producto({ ...data, id });
  productosMap[id] = newProduct;
  return newProduct;
}

export function getProducts() {
  return Object.values(productosMap);
}

export function getProductById({ id }) {
  if (!productosMap[id]) {
    throw new Error("Product not found");
  }
  return productosMap[id];
}

export function updateProduct({ id, data }) {
  if (!productosMap[id]) {
    throw new Error("Product not found");
  }
  const updatedProduct = new Producto({ ...productosMap[id], ...data, id });
  productosMap[id] = updatedProduct;
  return updatedProduct;;
}

export function deleteProduct({ id }) {
  if (!productosMap[id]) {
    throw new Error("Product not found");
  }
  const deletedProduct = productosMap[id];
  delete productosMap[id];
  return deletedProduct;
}

export function generateId() {
  return crypto.randomBytes(10).toString("hex");
}

export default {
    createProducto,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}