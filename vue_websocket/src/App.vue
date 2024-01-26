<template>
  <div class="background">
    <!-- Cabecera web -->
    <div class="row header">
      <div class="col-auto">
        <div class="user-card">Usuario: {{ username }}</div>
        <div class="users-online">Otros usuarios conectados:</div>
        <div class="list">
          <DxList :height="87" :width="200" :dataSource="listOfUsers"> </DxList>
        </div>
      </div>
      <div class="col-1 align-items-center d-flex arrow-img">test</div>
      <div class="col-3 align-items-center d-flex text-chat">
        <div class="col">Comunícate con algún usuario del chat haciendo doble click</div>
      </div>
      <div class="col title-web">Puja de viajes</div>
    </div>

    <!-- Credenciales de usuario -->
    <div v-if="initPage">
      <!-- <Credentials :initPage="initPage" :username="username" @UserConnected="initChat"></Credentials> -->
    </div>
    <!-- Cards de pujas de viajes -->
    <div class="text-center">
      <PortalPuja :username="username" @ListOfUsers="getUsers($event)"></PortalPuja>
    </div>

    <div class="contenedor">
      <div class="ventana-chat">
        <div class="cabecera">
          <h2>Chat</h2>
          <button onclick="cerrarChat()">Cerrar</button>
        </div>
        <div class="cuerpo">
          <!-- Contenido del chat -->
        </div>
      </div>
      <!-- Resto de tu contenido -->
    </div>
  </div>
</template>

<script>
// Import the Chat component
import { DxButton, DxList, DxSwitch, DxTextBox } from "devextreme-vue";
import { ref } from "vue";
import PortalPuja from "./components/PortalPuja.vue";
import Credentials from "./components/Credentials.vue";

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
    DxTextBox,
    DxSwitch,
    DxButton,
    DxList,
  },
};
</script>

<style>
.header {
  height: 150px;
  background-color: black !important;
  width: 100%;
}

.background {
  background-color: rgb(243, 243, 243);
  height: 100%;
}

.title-web {
  color: white;
  font-size: 100px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  text-align: center;
  justify-content: center;
}

.dx-switch-off {
  color: black !important;
}

.user-card {
  background-color: white;
  margin-top: 5px;
  padding: 5px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  margin-left: 5px;
  font-weight: 600;
  background-color: wheat;
}

.users-online {
  margin-left: 5px;
  background-color: white;
  padding: 2px 5px;
  border-top: 1px solid #ddd;
  font-weight: 600;
  background-color: rgb(152, 236, 236);
}

.list {
  background-color: white;
  margin-left: 5px;
}

.arrow-img {
  mask: url("./assets/arrow.svg");
  -webkit-mask: url("./assets/arrow.svg");
  -webkit-mask-size: cover;
  mask-size: cover;
  height: 140px !important;
  width: 170px !important;
  background-color: white;
}

.text-chat {
  font-size: 25px;
  color: white;
  text-align: center;
}

.contenedor {
  position: relative;
  /* Añade otros estilos según tus necesidades */
}

.ventana-chat {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.cabecera {
  background-color: #4caf50;
  color: #fff;
  padding: 10px;
  text-align: center;
}

.cuerpo {
  padding: 20px;
}
</style>
