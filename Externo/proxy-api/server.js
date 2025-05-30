const express = require("express"); //importación de librerias
const cors = require("cors");
const fetch = require("node-fetch");  


const app = express(); //creación de la instacia y definir el puerto
const PORT = 3000;

app.use(cors()); //evitar bloqueos CORS
app.use(express.static("public")); //acceder a los arcivos de la carpeta public 

app.get("/api/productos", async (req, res) => { //realizar la petición
  try {
    console.log("Solicitando productos desde backend...");

    const response = await fetch("https://autoparts-api.onrender.com/api/productos/b2b");

    if (!response.ok) { //verificar la respuesta
      throw new Error(`Error de respuesta: ${response.status}`);
    }

    const data = await response.json(); //convertir la respuesta en json
    console.log("Datos recibidos de API remota:", data);

    res.json(data.productos || data); //enviar la respuesta de tipo json a main.js
  
} catch (error) { //identificar errores
    console.error("Error al obtener productos:", error.message);
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => { //iniciar el servidor
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
