<template></template>

<script lang="ts">
import * as signalR from "@microsoft/signalr";
import { DxButton, DxTextBox } from "devextreme-vue";

export default {
  name: "App",
  setup() {
    // Crear la conexión al Hub del back
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7222/notificationsHub")
      .configureLogging(signalR.LogLevel.Trace)
      .build();

    // Conectarse a los métodos invocados por el hub "X" y recibir notificaciones del hub "X"
    connection.on("", () => {});

    // Cuando se pulsa el botón "Enviar al back" enviar notificación al hub "X
    // function ClickToSend() {
    //   connection.send("NoLoEntiendo", textValue.value);
    // }

    // Empezar la conexión al hub "X"
    connection
      .start()
      .then(() => {
        console.log("Conectado al hub");
      })
      .catch((err) => {
        console.log("Error al conectar al hub", err);
      });

    return {};
  },
  components: { DxTextBox, DxButton },
};
</script>

<style scoped></style>
