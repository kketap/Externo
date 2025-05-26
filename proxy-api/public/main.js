const contenedor = document.getElementById("productos-container"); //busqueda del contenedor

async function cargarProductos() { //definir función para la carga de productos desde la api
  try {
    const respuesta = await fetch("http://localhost:3000/api/productos"); //petición al localost
    const data = await respuesta.json(); //convertir la respuesta a json

    console.log("Datos recibidos completos:", data);

    if (data.error) { //identificar posible error con la data
      throw new Error(data.error);
    }

    const productos = data.productos || data;

    if (!Array.isArray(productos)) { //verificar que la respuesta este en formato Array
      throw new Error("La respuesta no es un array de productos");
    }

    productos.forEach(producto => { //listado de los productos
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h2>${producto.nombre}</h2>
        <p><strong>Marca:</strong> ${producto.marca}</p>
        <p><strong>Descripción:</strong> ${producto.descripcion || "Sin descripción"}</p>
        <p class="precio">Precio Mayorista: $${producto.precio_mayorista.toLocaleString()}</p>
        <p><strong>Stock:</strong> ${producto.stock}</p>
      `;
      contenedor.appendChild(card); //agregar al contenedor en formato carta
    });

  } catch (error) { //identificar posibles errores
    console.error("Error al cargar productos:", error);
    contenedor.innerHTML = "<p>Error al cargar productos. Inténtalo más tarde.</p>";
  }
}

cargarProductos(); //cargar listado en la consola
