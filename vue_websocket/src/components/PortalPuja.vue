<template>
  <div v-for="(product, index) in productsPuja" :key="index" class="d-inline-block justify-content-center">
    <CardInfo :product="product" @sendMessage="sendMessage"></CardInfo>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import productDB from "./../../base_datos/products.json";
import CardInfo from "./CardInfo.vue";
import events from "./../../events";
import { ListOfUsers } from "./../../events-vue-componets";

export default {
  name: "PortalPujaComponent",
  props: {
    username: {
      type: String,
    },
  },
  emits: [ListOfUsers],
  setup(props, { emit }) {
    const productsPuja = ref(productDB.products);
    const username = computed(() => props.username);

    // Utilización de la API WebSocket
    const socket = new WebSocket("ws://localhost:3000");

    // Guardamos en el server cada usuario que se loguea
    watch(username, () => {
      socket.send(JSON.stringify({ eventName: events.ADD_USERS, username: username.value }));
    });

    // Enviar datos al servidor mediante WebSockets
    function sendMessage(product) {
      const messageData = { eventName: events.MODIFY_PUJA, username: username.value, product: product };
      socket.send(JSON.stringify(messageData));
    }

    // Definir un manejador de eventos WebSocket 'onmessage' para recibir mensajes del servidor.
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.eventName === events.MODIFY_PUJA) {
        productsPuja.value = JSON.parse(data).products;
      } else if (data.eventName === events.ADD_USERS) {
        console.log("Usuarios", data.users);
        console.log("UserName", username.value);
        emit(ListOfUsers, data.users);
      }
    };

    window.addEventListener("beforeunload", () => {
      socket.send(JSON.stringify({ eventName: events.CLOSE_CLIENT, username: username.value }));
    });

    return {
      productsPuja,
      sendMessage,
    };
  },
  components: {
    CardInfo,
  },
};
</script>

<style scoped></style>
