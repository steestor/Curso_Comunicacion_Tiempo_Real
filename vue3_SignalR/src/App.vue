<template>
  <div class="container">
    <div class="row">
      <div class="col-auto">Visitas totales de la web:</div>
      <div class="col-auto">{{ numViews }}</div>
    </div>
    <div class="row">
      <div class="col-auto">Usuarios activos en este momento en la web:</div>
      <div class="col-auto">{{ numUsers }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import * as signalR from "@microsoft/signalr";
import { ref } from "vue";

export default {
  name: "App",
  setup() {
    const numViews = ref(0);
    const numUsers = ref(0);

    // Crear la conexión al Hub del back
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7222/notificationsHub", signalR.HttpTransportType.WebSockets)
      .build();

    // Conectarse a los métodos invocados por el hub "X" y recibir notificaciones del hub "X"
    connection.on("UpdateTotalViews", (totalViews) => {
      // Actualizar el número de visitas
      numViews.value = totalViews;
    });

    connection.on("UpdateTotalUsers", (totalUsers) => {
      // Actualizar el número de usuarios
      numUsers.value = totalUsers;
    });

    // Invocar métodos del hub "X" enviar notificación al hub
    function newView() {
      connection.send("NewWindowLoaded");
      // connection.invoke("NewWindowLoaded").then((res) => {
      //   console.log(res);
      // }).catch((err) => {
      //   console.log(err);
      // })
    }

    // Empezar la conexión al hub "X"
    connection
      .start()
      .then(() => {
        console.log("Conectado al hub");
        onConnectionStarted();
      })
      .catch((err) => {
        console.log("Error al conectar al hub", err);
      });

    function onConnectionStarted() {
      // Invocar métodos del hub "X" enviar notificación al hub
      newView();
    }

    return {
      numViews,
      numUsers,
    };
  },
  components: {},
};
</script>

<style scoped></style>
