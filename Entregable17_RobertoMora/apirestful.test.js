import { expect } from "chai";
import productsServices from "./services/api/productos.js";

describe("API Productos", () => {
  it("Should get a list of products successfully", async () => {
    const productos = productsServices.obtenerProductos();
    expect(productos.length).to.not.be.eq(0);
  });
  it("Should get a product successfully", async () => {
    const producto = await productsServices.obtenerProducto(
      "636c58cc680d193fea42e6a0"
    );
    expect(producto[0].nombre).to.be.eq("Batimovil");
  });
  it("Should create and delete a product successfully", async () => {
    const producto = await productsServices.crearProductos({
      nombre: "Mi Nave",
      precio: 15000,
      avatar: "https://i.ytimg.com/vi/VuVhwh-IVVg/maxresdefault.jpg",
      codigo: "MBA M2",
      stock: "10",
      descripcion: ";)",
    });
    expect(producto.mensaje).to.be.eq(
      "Actualizacion: Producto ingresado con exito"
    );
    let id = producto.product._id.toString();
    let result = await productsServices.borrarProducto(id);
    expect(result.mensaje).to.be.eq(
      "Se elimino de manera correcta el producto"
    );
  });
  it("Should update a product successfully", async () => {
    let id = "636c58cc680d193fea42e6a0";
    let data = {
      nombre: "Batimovil",
      precio: 37000,
    };
    const producto = await productsServices.actualizarProducto(id, data);
    expect(producto.precio).to.be.eq(37000);
  });
});
