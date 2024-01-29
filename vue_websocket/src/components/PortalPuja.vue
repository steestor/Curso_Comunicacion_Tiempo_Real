<template>
  <div v-for="(product, index) in productsPuja" :key="index" class="d-inline-block justify-content-center">
    <CardInfo :product="product" @sendMessage="sendMessageFromButtonPuja"></CardInfo>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import productDB from "./../../base_datos/products.json";
import CardInfo from "./CardInfo.vue";
import events from "./../../events";
import webSocketService from "./../shared/ws";

export default {
  name: "PortalPujaComponent",
  props: {
    username: {
      type: String,
    },
  },
  setup(props) {
    const productsPuja = ref(productDB.products);
    const username = computed(() => props.username);
    const { sendMessage, onMessage } = webSocketService();

    // Guardamos en el server cada usuario que se loguea
    watch(username, () => {
      sendMessage({ eventName: events.ADD_USERS, username: username.value });
    });

    // Enviar datos al servidor de una nueva puja
    function sendMessageFromButtonPuja(product) {
      sendMessage({ eventName: events.MODIFY_PUJA, username: username.value, product: product });
    }

    // Recibir datos del servidor
    onMessage((msg) => {
      if (msg.eventName === events.MODIFY_PUJA) {
        productsPuja.value = msg.data;
      }
    });

    // Revisar cuando se cierra la ventana del navegador para desloguear al usuario de esa sesión
    window.addEventListener("beforeunload", () => {
      sendMessage({ eventName: events.CLOSE_CLIENT, username: username.value });
    });

    return {
      productsPuja,
      sendMessageFromButtonPuja,
    };
  },
  components: {
    CardInfo,
  },
};
</script>

<style scoped></style>
