/* require("dotenv").config(); //cargar configuracion de variables de entorno

//const http = require("http");
const { neon } = require("@neondatabase/serverless"); //Trae la instancia Neon

const express = require('express') //Trae instancia de express
const app = express() //Configura express
const port = 3000 //Define puerto
const sql = neon(process.env.DATABASE_URL); //Crea la conexion con neon

app.get('/', async (req, res) => {
    //const result = await sql`SELECT version()`; //ejecuta la consulta SQL
    //const { version } = result[0]; // Obtengo el resultado
    const result = await sql`SELECT * FROM tbll_tareas`;
    res.json(result);
  //res.send('Hello World! 123'+ version )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) */

  require("dotenv").config(); // Cargar configuración de variables de entorno

  const { neon } = require("@neondatabase/serverless"); // Trae la instancia de Neon
  const express = require('express'); // Trae la instancia de Express
  const app = express(); // Configura Express
  const port = 3000; // Define el puerto
  const sql = neon(process.env.DATABASE_URL); // Crea la conexión con Neon
  
  // Ruta principal para mostrar las tareas en una tabla HTML con estilos
  app.get('/', async (req, res) => {
    try {
      // Ejecuta la consulta para obtener todas las tareas (id, titulo, descripcion)
      const result = await sql`SELECT id, titulo, descripcion FROM tbll_tareas`;
      
      // Crear la tabla HTML con los datos obtenidos
      let html = `
        <html>
          <head>
            <title>Lista de Tareas</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
              }
              table {
                width: 80%;
                border-collapse: collapse;
                margin: 20px 0;
                background-color: #fff;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              th, td {
                padding: 12px;
                text-align: left;
                border-bottom: 1px solid #ddd;
              }
              th {
                background-color: #4CAF50;
                color: white;
              }
              tr:hover {
                background-color: #f5f5f5;
              }
              h1 {
                color: #333;
              }
              .container {
                width: 90%;
                max-width: 1200px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Lista de Tareas</h1>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Descripción</th>
                  </tr>
                </thead>
                <tbody>
      `;
  
      // Agregar cada tarea a la tabla HTML
      result.forEach(task => {
        html += `
          <tr>
            <td>${task.id}</td>
            <td>${task.titulo}</td>
            <td>${task.descripcion}</td>
          </tr>
        `;
      });
  
      // Cerrar la tabla y el HTML
      html += `
                </tbody>
              </table>
            </div>
          </body>
        </html>
      `;
  
      // Enviar el HTML al navegador
      res.send(html);
  
    } catch (error) {
      console.error("Error al obtener las tareas", error);
      res.status(500).send("Error al obtener las tareas");
    }
  });
  
  // Iniciar el servidor
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  