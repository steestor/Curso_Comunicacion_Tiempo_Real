<template>
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
        <DxButton @click="startToList()" text="Entrar" type="default"></DxButton>
      </div>
    </div>
  </DxPopup>

  <div class="row">
    <div class="col-12">Soy: {{ username }}</div>
    <div class="col-12">
      <DxDataGrid :columns="columns" :dataSource="dataSource"> </DxDataGrid>
    </div>
  </div>
</template>

<script lang="ts">
import * as signalR from "@microsoft/signalr";
import { DxDataGrid, DxPopup, DxTextBox, DxButton } from "devextreme-vue";
import { ref } from "vue";

export default {
  name: "App",
  setup() {
    const columns = [
      {
        dataField: "NombreTare",
        caption: "Nombre tarea",
      },
      {
        dataField: "AsignadoA",
        caption: "Asignado a",
      },
      {
        dataField: "Estado",
        caption: "Estado de la tarea",
      },
      {
        type: "buttons",
        buttons: [
          {
            hint: "Asignarme tarea",
            icon: "edit",
            onClick: (e: any) => {
              e.row.data.AsignadoA = username.value;
              connection.send("UpdateTarea", JSON.stringify(e.row.data));
            },
          },
          {
            hint: "Actualizar tarea",
            text: "Actualizar",
            onClick: (e: any) => {
              console.log(e);
            },
          },
        ],
      },
    ];
    const dataSource = ref([
      {
        Id: 1,
        NombreTare: "Hacer la lista de la compra",
        AsignadoA: "",
        Estado: "Pendiente",
      },
      {
        Id: 2,
        NombreTare: "Tender la ropa",
        AsignadoA: "",
        Estado: "Pendiente",
      },
      {
        Id: 3,
        NombreTare: "Poner la lavadora",
        AsignadoA: "",
        Estado: "Pendiente",
      },
    ]);
    const username = ref("");
    const visiblePopup = ref(true);

    // Crear la conexión al Hub del back
    const connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:7222/tareasHub").build();

    // Conectarse a los métodos invocados por el hub "X" y recibir notificaciones del hub "X"
    connection.on("TareaUpdated", (tarea: string) => {
      const task = JSON.parse(tarea);
      dataSource.value.forEach((element: any) => {
        if (element.Id === task.Id) {
          element.AsignadoA = task.AsignadoA;
          //element.Estado = task.Estado;
        }
      });
    });

    // Empezar la conexión al hub "X"
    connection
      .start()
      .then(() => {
        console.log("Conectado al hub");
      })
      .catch((err) => {
        console.log("Error al conectar al hub", err);
      });

    function usernameChanged(e: any) {
      username.value = e.value;
    }

    function startToList() {
      visiblePopup.value = false;
    }

    return {
      columns,
      dataSource,
      username,
      visiblePopup,
      usernameChanged,
      startToList,
    };
  },
  components: {
    DxDataGrid,
    DxPopup,
    DxTextBox,
    DxButton,
  },
};
</script>

<style scoped></style>
