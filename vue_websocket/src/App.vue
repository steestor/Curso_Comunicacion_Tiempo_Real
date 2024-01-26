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
      <PortalPuja :username="username" @ListOfUsers="getUsers($event)"></PortalPuja>
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

export default {
  name: "App",
  setup() {
    const initPage = ref(true);
    const username = ref("");
    const listOfUsers = ref([]);

    function usernameChanged(e) {
      username.value = e.value;
    }

    function initChat(e) {
      username.value = e.value;
      initPage.value = false;
    }

    function getUsers(users) {
      listOfUsers.value = users.filter((userName) => userName !== username.value);
    }

    return {
      initPage,
      username,
      listOfUsers,
      getUsers,
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
