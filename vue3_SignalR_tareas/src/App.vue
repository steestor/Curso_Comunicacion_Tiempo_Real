<template>
  <div>
    <DxPopup
      :visible="visiblePopup"
      :width="300"
      :height="205"
      :showTitle="true"
      title="Credenciales de usuario"
      :dragEnabled="false"
      :hideOnOutsideClick="false"
      :showCloseButton="false"
    >
      <div>
        <div class="row mb-2">
          <DxTextBox placeholder="Nombre de Usuario" :value="username" @valueChanged="usernameChanged($event)"></DxTextBox>
        </div>
        <div class="row">
          <DxButton @click="initApp()" text="Entrar" type="default"></DxButton>
        </div>
      </div>
    </DxPopup>
  </div>

  <div>
    <div>Nombre de usuario: {{ username }}</div>
    <DxDataGrid :data-source="dataSource" :columns="columns"> </DxDataGrid>
  </div>
</template>

<script lang="ts">
import * as signalR from "@microsoft/signalr";
import { DxButton, DxTextBox, DxDataGrid, DxPopup } from "devextreme-vue";
import { ref } from "vue";

export default {
  name: "App",
  setup() {
    const columns = [
      {
        dataField: "NombreTarea",
        caption: "Nombre de la tarea",
      },
      {
        dataField: "PersonaAsignada",
        caption: "Persona asignada",
      },
      {
        dataField: "EstadoTarea",
        caption: "Estado de la tarea",
      },
      {
        type: "buttons",
        buttons: [
          {
            hint: "Asignarme Tarea",
            icon: "edit",
            onClick: (e: any) => {
              e.row.data.PersonaAsignada = username.value;
              connection.send("AsignarmeTarea", JSON.stringify(e.row.data));
            },
          },
        ],
      },
    ];
    const dataSource = ref([
      {
        id: 1,
        NombreTarea: "Hacer la lista de la compra",
        PersonaAsignada: "",
        EstadoTarea: "Pendiente",
      },
      {
        id: 2,
        NombreTarea: "Tender la ropa",
        PersonaAsignada: "",
        EstadoTarea: "Pendiente",
      },
      {
        id: 3,
        NombreTarea: "Poner la lavadora",
        PersonaAsignada: "",
        EstadoTarea: "Pendiente",
      },
      {
        id: 4,
        NombreTarea: "Fregar",
        PersonaAsignada: "",
        EstadoTarea: "Pendiente",
      },
      {
        id: 5,
        NombreTarea: "Barrer",
        PersonaAsignada: "",
        EstadoTarea: "Pendiente",
      },
    ]);
    const username = ref("");
    const visiblePopup = ref(true);

    //Crear la conexión al Hub del back
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7222/tareasHub")
      .configureLogging(signalR.LogLevel.Trace)
      .build();

    // Conectarse a los métodos invocados por el hub "X" y recibir notificaciones del hub "X"
    connection.on("UpdateData", (data) => {
      const dataUpdated = JSON.parse(data);
      dataSource.value.forEach((element) => {
        if (element.id === dataUpdated.id) {
          element.PersonaAsignada = dataUpdated.PersonaAsignada;
          element.EstadoTarea = dataUpdated.EstadoTarea;
        }
      });
    });

    // Cuando se pulsa el botón "Enviar al back" enviar notificación al hub "X
    // function ClickToSend() {
    //   connection.send("NoLoEntiendo", textValue.value);
    // }

    //Empezar la conexión al hub "X"
    connection
      .start()
      .then(() => {
        console.log("Conectado al hub");
      })
      .catch((err) => {
        console.log("Error al conectar al hub", err);
      });

    function usernameChanged(value: any) {
      username.value = value.value;
      visiblePopup.value = false;
    }

    function initApp() {
      visiblePopup.value = false;
    }

    return {
      columns,
      dataSource,
      username,
      visiblePopup,
      usernameChanged,
      initApp,
    };
  },
  components: { DxTextBox, DxButton, DxDataGrid, DxPopup },
};
</script>

<style scoped></style>
