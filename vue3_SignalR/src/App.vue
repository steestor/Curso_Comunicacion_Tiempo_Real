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
  <div class="row mt-4">
    <div class="col-auto">
      <DxTextBox :value="textValue"></DxTextBox>
    </div>
    <div class="col-auto">
      <DxButton @click="ClickToSend" text="Enviar al back"></DxButton>
    </div>
  </div>
</template>

<script lang="ts">
import * as signalR from "@microsoft/signalr";
import { DxButton, DxTextBox } from "devextreme-vue";
import { ref } from "vue";

export default {
  name: "App",
  setup() {
    const numViews = ref(0);
    const numUsers = ref(0);
    const textValue = ref("No lo entiendo");

    // Crear la conexión al Hub del back
    const connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:7222/notificationsHub").build();

    // Conectarse a los métodos invocados por el hub "X" y recibir notificaciones del hub "X"
    connection.on("UpdateTotalViews", (totalViews: number) => {
      // Actualizar el número de visitas
      numViews.value = totalViews;
    });

    connection.on("UpdateTotalUsers", (totalUsers: number) => {
      // Actualizar el número de usuarios
      numUsers.value = totalUsers;
    });

    connection.on("NoLoEntiendo", (msg: any) => {
      console.log(msg);
      textValue.value = msg;
      debugger;
    });

    // Cuando se pulsa el botón "Enviar al back" enviar notificación al hub "X
    function ClickToSend() {
      connection.send("NoLoEntiendo", textValue.value);
    }

    function newView() {
      connection.send("NewWindowLoaded");
      // connection.invoke("NewWindowLoaded").then((res) => {
      //   console.log(res);
      // }).catch((err) => {
      //   console.log(err);
      // })
    }

    function onConnectionStarted() {
      newView();
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

    return {
      numViews,
      numUsers,
      textValue,
      ClickToSend,
    };
  },
  components: { DxTextBox, DxButton },
};
</script>

<style scoped></style>
