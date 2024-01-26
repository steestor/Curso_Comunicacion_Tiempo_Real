<template>
  <DxPopup
    :visible="true"
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
      <div class="row mb-2">
        <div class="col-12">
          <DxSwitch
            :value="switchValue"
            switchedOnText="Mujer"
            switchedOffText="Hombre"
            :width="100"
            @valueChanged="switchValue = $event.value"
          ></DxSwitch>
        </div>
      </div>
      <div class="row">
        <DxButton @click="initChat()" text="Entrar" type="default"></DxButton>
      </div>
    </div>
  </DxPopup>
</template>

<script>
import { DxButton, DxPopup, DxSwitch, DxTextBox } from "devextreme-vue";
import { ref } from "vue";
import { UserConnected } from "./../../events-vue-componets";

export default {
  name: "Credentials",
  props: {
    username: {
      type: String,
    },
    initPage: {
      type: Boolean,
    },
  },
  emits: [UserConnected],
  setup(props, { emit }) {
    const switchValue = ref(true);

    function usernameChanged(e) {
      emit(UserConnected, e);
    }

    return {
      switchValue,
      usernameChanged,
    };
  },
  components: {
    DxPopup,
    DxButton,
    DxSwitch,
    DxTextBox,
  },
};
</script>

<style></style>
