(function () {
  let productos = [];
  let messages = [];

  const formProductos = document.getElementById("form-producto");
  const formMessage = document.getElementById("form-message");
  const inputId = document.getElementById("idtable");
  const inputNombre = document.getElementById("nombre");
  const inputPrecio = document.getElementById("precio");
  const inputCodigo = document.getElementById("codigo");
  const inputStock = document.getElementById("stock");
  const inputDescripcion = document.getElementById("descripcion");
  const inputAvatar = document.getElementById("avatar");
  const inputEmail = document.getElementById("input-email");
  const inputMessage = document.getElementById("input-message");
  const listMessages = document.getElementById("list-messages");
  const inputNombreUser = document.getElementById("input-nombre");
  const inputApellido = document.getElementById("input-apellido");
  const inputEdad = document.getElementById("input-edad");
  const inputAlias = document.getElementById("input-alias");
  const inputAvatarUser = document.getElementById("input-avatar");

  const socket = io();

  
  function showMessage(data) {
    const li = document.createElement("li");
    li.innerHTML = `<p><img src= "${data.author.avatar}" width="150px" height="150px"><strong><span style='color:green'> ${data.author.alias} [${data.createdAt}]</span> </strong>:<i> ${data.message}</i></p>`;
    listMessages.appendChild(li);
  }

  function valorcompresion(data) {
    const h1 = document.getElementById("list-result");
    h1.innerText = `${data}`;
  }

  
  formMessage.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = {
      author: {
        id: inputEmail.value,
        nombre: inputNombreUser.value,
        apellido: inputApellido.value,
        edad: inputEdad.value,
        alias: inputAlias.value,
        avatar: inputAvatarUser.value,
      },
      message: inputMessage.value,
    };
    socket.emit("new-message", data);
    inputMessage.value = "";
    inputMessage.focus();
  });
  socket.on("history-messages", (data,result) => {
    messages = data;
    listMessages.innerText = "";
    messages.forEach((message) => {
      showMessage(message);
    });
    valorcompresion(result)
  });

  socket.on("notification-message", (data,result) => {
    messages.push(data);
    showMessage(data);
    valorcompresion(result)
  });

  // Empieza la parte de producto
  const appendProduct = (data) => {
    const productsTable = document.querySelector(".productsTable");
    let productsTableBodyRow = document.createElement("tr");
    productsTableBodyRow.className = "productsTableBodyRow";
    let idProduct = document.createElement("td");
    idProduct.innerText = data.id;
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
      id: inputId.value,
      nombre: inputNombre.value,
      precio: inputPrecio.value,
      codigo: inputCodigo.value,
      descripcion: inputDescripcion.value,
      stock: inputStock.value,
      avatar: inputAvatar.value,
    });
    inputId.value = "";
    inputId.focus();
    inputNombre.value = "";
    inputNombre.focus();
    inputPrecio.value = "";
    inputPrecio.focus();
    inputCodigo.value = "";
    inputCodigo.focus();
    inputDescripcion.value = "";
    inputDescripcion.focus();
    inputStock.value = "";
    inputStock.focus();
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
    appendProduct(data);
  });
})();
