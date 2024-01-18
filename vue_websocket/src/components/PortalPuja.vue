<template>
  <div v-for="(product, index) in productsAuction" :key="index" class="d-inline-block justify-content-center">
    <CardInfo :product="product" @sendMessage="sendMessage"></CardInfo>
  </div>
</template>

<script>
import { ref } from "vue";

import CardInfo from "./CardInfo.vue";
import { products } from "./../../baseDatos/products.js";

export default {
  name: "PortalPujaComponent",
  setup() {
    const productsAuction = ref(products);
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
      console.log(event);
      const data = JSON.parse(event.data);
      debugger; // eslint-disable-line no-debugger
      const productPuja = productsAuction.value.find((product) => product.id === data.product.id);
      productPuja.price = productPuja.price + 5;
      //const message = JSON.parse(event.data);
      //messages.value.push(event.data);
    };

    return {
      productsAuction,
      sendMessage,
    };
  },
  components: {
    CardInfo,
  },
};
</script>

<style scoped></style>
