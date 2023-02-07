import { buildSchema } from 'graphql'

export default buildSchema(`
type Usuario {
  id: ID!
  firstname: String
  lastname: String
  email: String
  age: Int
}
input UsuarioInput {
  firstname: String
  lastname: String
  email: String
  age: Int
}

type Producto {
  id: ID!
  nombre: String
  precio: Int
  codigo: String
  descripcion: String
}
input ProductoInput {
  nombre: String
  precio: Int
  codigo: String
  descripcion: String
}

type Query {
  getUsers: [Usuario]
  getUserById(id: ID!): Usuario
  getProducts: [Producto]
  getProductById(id: ID!): Producto
}
type Mutation {
  createUsuario(data: UsuarioInput!): Usuario
  updateUser(id: ID!, data: UsuarioInput!): Usuario
  deleteUser(id: ID!): Usuario
  createProducto(data: ProductoInput!): Producto
  updateProduct(id: ID!, data: ProductoInput!): Producto
  deleteProduct(id: ID!): Producto
}
`)