const botonComprar = document.getElementById("boton-comprar");
const mensajeCompra = document.getElementById("mensaje-compra");

//funcionalidad btn comprar
botonComprar.addEventListener("click", async () => {
  if (carrito.length === 0) {
    mensajeCompra.textContent = "El carrito está vacío.";
    return;
  }
  
  //definir las constantes del PDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // encabezado 
  doc.setFontSize(16);
  doc.text("Factura de Compra", 14, 20);
  
  //definir la fecha y la hora
  const ahora = new Date();
  const fechaHora = ahora.toLocaleString(); 
  
  //detalles de la compra y la empresa
  doc.setFontSize(11);
  doc.text(`Fecha y hora: ${fechaHora}`, 14, 28);
  doc.text("Distribuidora Hermanos Rodriguez SPA", 14, 33);
  doc.text("RUT: 72.648.937-6", 14, 38);
  doc.text("Dirección: Av. Crib, Of 211",14, 43)
  doc.text("Email: contacto@rodriguezempresas.cl", 14, 48);
  doc.text("Telefóno: 22534591",14, 53)

  // listado de productos 
  let y = 62;  
  doc.setFontSize(16);
  doc.text("Productos:", 14, y);
  y += 8;
  
  doc.setFontSize(11);
  carrito.forEach((p, i) => {
    const qty = p.cantidad || 1; 
    const precioUnit = p.precio_mayorista || p.precio || 0;
    const subtotal = precioUnit * qty;

    const linea = `${i + 1}. ${p.nombre} x${qty} - $${subtotal.toLocaleString()}`;
    doc.text(linea, 14, y);
    y += 6;
  });

  // total 
  const total = carrito.reduce((sum, p) => {
    const qty = p.cantidad || 1;
    const precioUnit = p.precio_mayorista || p.precio || 0;
    return sum + precioUnit * qty;
  }, 0);

  
  // dejar un pequeño espacio antes del total
  y += 8;
  doc.setFontSize(14);
  doc.text(`Total: $${total.toLocaleString()}`, 14, y);

  // descargar PDF 
  doc.save("Factura.pdf");

  // limpiar carrito y mensaje 
  carrito = [];
  actualizarCarrito();
  mensajeCompra.textContent = "¡Gracias por tu compra! Factura descargada.";
});