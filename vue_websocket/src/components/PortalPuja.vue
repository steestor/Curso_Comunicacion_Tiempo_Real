<template>
  <div v-for="(product, index) in productsPuja" :key="index" class="d-inline-block justify-content-center">
    <CardInfo :product="product" @sendMessage="sendMessage"></CardInfo>
  </div>
</template>

<script>
import { ref } from "vue";
import productDB from "./../../base_datos/products.json";
import CardInfo from "./CardInfo.vue";

export default {
  name: "PortalPujaComponent",
  setup() {
    const productsPuja = ref(productDB.products);
    const username = ref("");

    // Utilización de la API WebSocket
    const socket = new WebSocket("ws://localhost:3000");

    // Enviar datos al servidor mediante WebSockets
    function sendMessage(product) {
      const messageData = { username: username.value, product: product };
      socket.send(JSON.stringify(messageData));
    }

    // Definir un manejador de eventos WebSocket 'onmessage' para recibir mensajes del servidor.
    socket.onmessage = (event) => {
      productsPuja.value = JSON.parse(event.data).products;
    };

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
