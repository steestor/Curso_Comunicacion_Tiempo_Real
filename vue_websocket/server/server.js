// Importar módulos necesarios
const express = require("express");
const http = require("http");
const fs = require("fs");
const WebSocket = require("ws");
const events = require("./../events");
const listOfUsers = [];
const clientsServer = new Map();

// Crear una instancia de aplicación Express
const app = express();

// Proveer las imagenes de los productos desde el back
app.use("/images", express.static("./../src/assets/products"));

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
  socket.on("message", (e) => {
    const data = JSON.parse(e);

    if (data.eventName === events.MODIFY_PUJA) {
      modifyPuja(data);
    } else if (data.eventName === events.ADD_USERS) {
      saveUsersLogued(data, socket);
    } else if (data.eventName === events.CLOSE_CLIENT) {
      closeClients(data);
    } else if (data.eventName === events.SEND_PRIVATE_MESSAGE) {
      privateMessage(data);
    }
  });

  // Listen for WebSocket connection close events
  socket.on("close", () => {
    console.log("cliente desconectado.");
    if (websocketServer.clients.length === 0) {
      listOfUsers = [];
    }
  });
});

function privateMessage(data) {
  websocketServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ data: data, eventName: events.SEND_PRIVATE_MESSAGE }));
    }
  });
}

function saveUsersLogued(data, socket) {
  listOfUsers.push(data.username);
  clientsServer.set(data.username, socket);

  websocketServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ users: listOfUsers, eventName: events.ADD_USERS }));
    }
  });
}

function closeClients(data) {
  const newListOfUsers = listOfUsers.filter((username) => username !== data.username);

  websocketServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ users: newListOfUsers, eventName: events.ADD_USERS }));
    }
  });
}

function modifyPuja(data) {
  // Modificar fichero de datos
  const newData = getDataModified(data.product);

  // Transmitir el mensaje a todos los clientes conectados
  websocketServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ data: newData.products, eventName: events.MODIFY_PUJA }));
    }
  });
}

function getDataModified(product) {
  // Leer el contenido del archivo JSON
  const contenido = fs.readFileSync("./../base_datos/products.json", { encoding: "utf8" });
  // Convertir el contenido a un objeto JavaScript

  const datos = JSON.parse(contenido);
  const productPuja = datos.products.find((p) => p.id === product.id);
  productPuja.price = productPuja.price + 5;

  // Convertir el objeto modificado de nuevo a JSON
  const nuevoContenido = JSON.stringify(datos);
  fs.writeFileSync("./../base_datos/products.json", nuevoContenido);

  return datos;
}
