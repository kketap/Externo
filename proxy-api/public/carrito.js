const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total");

let carrito = []; //listado del carrito

//función para agregar y actualizar la lista del carrito
function agregarAlCarrito(producto) { 
  carrito.push(producto);
  actualizarCarrito();
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";

  let total = 0;

  carrito.forEach((producto, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${producto.nombre} - $${producto.precio_mayorista.toLocaleString()} 
      <button onclick="eliminarDelCarrito(${index})">❌</button> 
    `; //eliminar productos
    listaCarrito.appendChild(li);
    total += producto.precio_mayorista; //calcular el total
  });

  totalCarrito.textContent = total.toLocaleString();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito(); //eliminar productos y actualizar carrito
}