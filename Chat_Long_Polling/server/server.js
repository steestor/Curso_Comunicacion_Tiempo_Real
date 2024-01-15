const express = require("express");
const cors = require("cors"); // Importa el paquete cors
const app = express();
const PORT = 3000;

let messages = [];
let subscribers = [];

// Utiliza cors como middleware
app.use(cors());

app.use(express.static("public"));

var corsOption = function (req, callback) {
  callback(null, { origin: false });
};

app.get("/messages", cors(corsOption), (req, res) => {
  let id = subscribers.length + 1;
  subscribers[id] = res;

  const waitForMessages = () => {
    if (messages.length > 0) {
      messages = [];
      subscribers = [];
      res.json({ messages });
    } else {
      setTimeout(waitForMessages, 1000); // Long Polling timeout
    }
  };

  waitForMessages();
});

// Método para provocar un timeout en el servidor y ver como se relanza la petición desde el cliente
app.get("/messagesTimeOut", cors(corsOption), (req, res) => {
  setTimeout(() => {
    res
      .status(502)
      .send("Error 502: Bad Gateway - Problema en el servidor intermedio");
  }, 3000);
});

app.post("/sendMessage", express.json(), (req, res) => {
  const { message } = req.body;
  messages.push(message);
  //subscribers[subscribers.length + 1] = res;

  subscribers.forEach((resSubs) => {
    resSubs.send({ messages });
  });

  subscribers = [];

  res.send("Message received");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
