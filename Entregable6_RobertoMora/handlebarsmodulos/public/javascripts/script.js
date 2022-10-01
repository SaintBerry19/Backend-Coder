import { saveMessage } from "../../controllers/filereader";
(function  () {
  let productos = [];
  let messages = [];

  const formProductos = document.getElementById("form-producto");
  const formMessage = document.getElementById('form-message');
  const inputId = document.getElementById("id");
  const inputNombre = document.getElementById("nombre");
  const inputPrecio = document.getElementById("precio");
  const inputAvatar = document.getElementById("avatar");
  const inputEmail = document.getElementById("input-email");
  const inputMessage = document.getElementById("input-message");
  const listMessages = document.getElementById("list-messages");

  const socket = io();

  function showMessage(data) {
    const li = document.createElement("li");
    li.innerHTML = `<p><strong><span style='color:green'>${data.email} [${data.date}]</span> </strong>:<i> ${data.message}</i></p>`;
    listMessages.appendChild(li);
  }

  formMessage.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = {
      email: inputEmail.value,
      message: inputMessage.value,
    };
    socket.emit("new-message", data);
    inputMessage.value = "";
    inputMessage.focus();
  });
  socket.on("history-messages", (data) => {
    messages = data;
    listMessages.innerText = "";
    messages.forEach((message) => {
      showMessage(message);
    });
  });

  socket.on("notification-message", (data) => {
    messages.push(data);
    showMessage(data);
  });

  // Empieza la parte de producto
  const appendProduct = (data) => {
    const productsTable = document.querySelector(".productsTable");
    let productsTableBodyRow = document.createElement("tr");
    productsTableBodyRow.className = "productsTableBodyRow";
    let idProduct = document.createElement("td");
    idProduct.innerText = data._id;
    let nombreProducto = document.createElement("td");
    nombreProducto.innerText = data.nombre;
    let precioProducto = document.createElement("td");
    precioProducto.innerText = data.precio;
    let avatarProducto = document.createElement("td");
    let picture = new Image();
    picture.src = data.avatar;
    picture.setAttribute("width", "160px");
    picture.setAttribute("height", "150px");
    picture.setAttribute("alt", "Avatar no valido");
    avatarProducto.append(picture);
    productsTableBodyRow.append(
      idProduct,
      nombreProducto,
      precioProducto,
      avatarProducto
    );
    productsTable.append(productsTableBodyRow);
  };

  formProductos.addEventListener("submit", (event) => {
    event.preventDefault();
    socket.emit("nuevo-producto", {
      _id: inputId.value,
      nombre: inputNombre.value,
      precio: inputPrecio.value,
      avatar: inputAvatar.value,
    });
    inputId.value = "";
    inputId.focus();
    inputNombre.value = "";
    inputNombre.focus();
    inputPrecio.value = "";
    inputPrecio.focus();
    inputAvatar.value = "";
    inputAvatar.focus();
  });

  socket.on("connect", () => {
    console.log("Conectados al servidor");
  });
  socket.on("inicio-productos", (data) => {
    productos = data;
    productos.forEach((producto) => {
      appendProduct(producto);
    });
  });

  socket.on("notificacion-producto", (data) => {
    appendProduct(data)

  });
})();
