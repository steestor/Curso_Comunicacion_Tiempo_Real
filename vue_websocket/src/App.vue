<template>
  <div class="background">
    <!-- Cabecera web -->
    <Header :username="username" :listOfUsers="listOfUsers"></Header>

    <!-- Credenciales de usuario -->
    <div v-if="initPage">
      <Credentials :initPage="initPage" :username="username" @UserConnected="initChat"></Credentials>
    </div>

    <!-- Cards de pujas de viajes -->
    <div class="text-center">
      <PortalPuja :username="username"></PortalPuja>
    </div>
  </div>
</template>

<script>
// Import the Chat component
import { DxButton, DxList, DxSwitch, DxTextBox } from "devextreme-vue";
import { ref } from "vue";
import PortalPuja from "./components/PortalPuja.vue";
import Credentials from "./components/Credentials.vue";
import Header from "./components/Header.vue";
import webSocketService from "./shared/ws";
import events from "./../events";

export default {
  name: "App",
  setup() {
    const initPage = ref(true);
    const username = ref("");
    const listOfUsers = ref([]);
    const { onMessage } = webSocketService();

    function usernameChanged(e) {
      username.value = e.value;
    }

    // Cerramos el popup de credenciales y indicamos que usuario se ha conectado
    function initChat(e) {
      username.value = e.value;
      initPage.value = false;
    }

    // Actualizamos la lista de usuarios conectados a partir de los datos del server
    onMessage((msg) => {
      if (msg.eventName === events.ADD_USERS) {
        listOfUsers.value = msg.users.filter((userName) => userName !== username.value);
      }
    });

    return {
      initPage,
      username,
      listOfUsers,
      usernameChanged,
      initChat,
    };
  },
  components: {
    PortalPuja,
    Credentials,
    Header,
    DxTextBox,
    DxSwitch,
    DxButton,
    DxList,
  },
};
</script>

<style>
.background {
  background-color: rgb(243, 243, 243);
  height: 100%;
}

.dx-switch-off {
  color: black !important;
}
</style>
