let ids=[];
let contenedorCarrito = document.getElementById("contenedorCarrito");
let contenedorArray = document.getElementById("inputArray");

function agregarCarrito(id) {
  let verificador = document.getElementById(`productoid` + id);
  if (verificador) {
    let cantidad = document.getElementById("productocantidad" + id);
    let nuevaCantidad = document.getElementById(`quantity` + id).valueAsNumber;
    cantidad.innerText = Number(cantidad.innerText) + nuevaCantidad;
    ids.forEach((element)=>{
      if (element.id===id){
        element.cantidad = Number(cantidad.innerText)
      }
    })
    if(Number(cantidad.innerText)<1){
      verificador.remove()
      ids = ids.filter(element=>element.id!==id)
      let text= JSON.stringify(ids)
      contenedorArray.value=text;
    }
    else{  
      let subtotal = document.getElementById("subtotal" + id);
      subtotal.innerText =
      Number(cantidad.innerText) *
      Number(document.getElementById(`precio` + id).innerText);}    
      let text= JSON.stringify(ids)
      contenedorArray.value=text;
  } else {
    let tarjetaProducto = document.createElement("tr");
    let producto_id = document.createElement("td");
    producto_id.innerHTML = document.getElementById(`id` + id).innerHTML;
    let producto_nombre = document.createElement("td");
    producto_nombre.innerHTML = document.getElementById(
      `nombre` + id
    ).innerHTML;
    let producto_precio = document.createElement("td");
    producto_precio.innerHTML = document.getElementById(
      `precio` + id
    ).innerHTML;
    let producto_avatar = document.createElement("td");
    producto_avatar.innerHTML = document.getElementById(
      `avatar` + id
    ).innerHTML;
    let producto_quantity = document.createElement("td");
    producto_quantity.setAttribute("id", "productocantidad" + id);
    producto_quantity.innerText = document.getElementById(
      `quantity` + id
    ).valueAsNumber;
    let subtotal = document.createElement("td");
    subtotal.setAttribute("id", "subtotal" + id);
    subtotal.innerText =
      document.getElementById(`quantity` + id).valueAsNumber *
      Number(document.getElementById(`precio` + id).innerText);
    tarjetaProducto.setAttribute("id", "productoid" + id);
    tarjetaProducto.appendChild(producto_id);
    tarjetaProducto.appendChild(producto_nombre);
    tarjetaProducto.appendChild(producto_precio);
    tarjetaProducto.appendChild(producto_avatar);
    tarjetaProducto.appendChild(producto_quantity);
    tarjetaProducto.appendChild(subtotal);
    contenedorCarrito.appendChild(tarjetaProducto);
    ids.push({id:id,cantidad:document.getElementById(
      `quantity` + id
    ).valueAsNumber})
    let text= JSON.stringify(ids)
    contenedorArray.value=text;
  }
}
