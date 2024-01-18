<template>
  <div class="background">
    <!-- Cabecera web -->
    <div class="header">
      <div class="title-web">Puja de viajes</div>
    </div>

    <!-- Cards de pujas de viajes -->
    <div class="text-center">
      <PortalPuja></PortalPuja>
    </div>
  </div>
</template>

<script>
// Import the Chat component
import PortalPuja from "./components/PortalPuja.vue";

export default {
  name: "App",
  components: {
    PortalPuja,
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
</style>
