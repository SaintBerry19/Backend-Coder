import axios from "axios";

await axios
  .get("http://localhost:8080/api/productos")
  .then((response) => console.log("GET multiple", response.data))
  .catch(console.error);

await axios
  .get("http://localhost:8080/api/productos/636c58cc680d193fea42e6a0")
  .then((response) => console.log("GET simple", response.data))
  .catch(console.error);

//Descomentar para hacer pruebas y verificar los nuevos ids al insertar el producto

// await axios
//   .post("http://localhost:8080/api/productos", {
//     nombre: "Mi Nave",
//     precio: 15000,
//     avatar: "https://i.ytimg.com/vi/VuVhwh-IVVg/maxresdefault.jpg",
//     codigo: "MBA M2",
//     stock: "10",
//     descripcion: ";)",
//   })
//   .then((response) => console.log("POST", response.data))
//   .catch(console.error);

// await axios
//   .put("http://localhost:8080/api/productos/63cd754ba159e0acfe92c8b0", {
//     nombre: "MacBook Air M2",
//     precio: 35000,
//   })
//   .then((response) => console.log("PUT", response.data))
//   .catch(console.error);

// await axios
//   .delete("http://localhost:8080/api/productos/63cd7617766d96bfe0579d54")
//   .then((response) => console.log("DELETE", response.data))
//   .catch(console.error);