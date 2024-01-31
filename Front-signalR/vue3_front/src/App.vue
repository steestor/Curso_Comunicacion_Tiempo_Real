<template>
  <div class="container">
    <div class="row">
      <div class="col-auto">Visitas totales de la web:</div>
      <div class="col-auto">(Número de visitas que vendrá del back)</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  setup() {
    const numViews = ref(0);

    // Crear la conexión al Hub del back
    const connection = new HubConnectionBuilder().withUrl("https://localhost:7222/notificationsHub").build();

    // Conectarse a los métodos invocados por el hub "X" y recibir notificaciones del hub "X"
    connection.on("UpdateTotalViews", (totalViews) => {
      // Actualizar el número de visitas
      numViews.value = totalViews;
    });

    // Invocar métodos del hub "X" enviar notificación al hub
    function newView() {
      connection.invoke("NewView");
    }

    // Empezar la conexión al hub "X"
    connection
      .start()
      .then(() => {
        console.log("Conectado al hub");
      })
      .catch((err) => {
        console.log("Error al conectar al hub", err);
      });

    return {};
  },
  components: {},
};
</script>

<style></style>
