// Importar módulos necesarios
const express = require("express");
const http = require("http");
const fs = require("fs");
const WebSocket = require("ws");

// Crear una instancia de aplicación Express
const app = express();

// Crear un servidor HTTP utilizando la instancia de aplicación Express
const server = http.createServer(app);

// Cree una instancia de servidor WebSocket y adjúntela al servidor HTTP
const websocketServer = new WebSocket.Server({ server });

// Inicie el servidor escuchando en el puerto 3000
server.listen(3000, () => {
  console.log("Servidor Websocket iniciado en el puerto 3000");
});

// Recepción de conexiones WebSocket
websocketServer.on("connection", (socket) => {
  // Registrar un mensaje cuando se conecta un nuevo cliente
  console.log("cliente conectado.");

  // Escucha de mensajes WebSocket entrantes
  socket.on("message", (data) => {
    // Transmitir el mensaje a todos los clientes conectados
    test(data.product);

    websocketServer.clients.forEach(function each(client) {
      //if (client !== socket && client.readyState === WebSocket.OPEN) {

      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  function test(product) {
    // Leer el contenido del archivo JSON
    const contenido = fs.readFileSync("./../baseDatos/products.json");
    // Convertir el contenido a un objeto JavaScript
    const datos = JSON.parse(contenido);
    const productPuja = datos.products.find((p) => p.id === product.id);
    productPuja.price = productPuja.price + 5;

    console.log(productPuja.price);

    // Convertir el objeto modificado de nuevo a JSON
    const nuevoContenido = JSON.stringify(datos);

    console.log(nuevoContenido);
    fs.writeFileSync("./../baseDatos/products.json", nuevoContenido, "utf8");
  }

  // Listen for WebSocket connection close events
  socket.on("close", () => {
    // Log a message when a client disconnects
    console.log("Client disconnected");
  });
});
