<template>
  <div class="content-chat">
    <div class="window-chat">
      <div class="header-chat row">
        <div class="col-auto">
          <img width="40" height="40" :src="avatar" />
        </div>

        <div class="col">
          <div class="row">{{ userTo }}</div>
          <div class="row">En línea</div>
        </div>
        <div class="col-auto">
          <DxButton icon="close"></DxButton>
        </div>
      </div>
      <div class="body-chat">
        <!-- Contenido del chat -->
        <div class="row">
          <div class="col">
            <DxTextBox value="" :readOnly="true"></DxTextBox>
          </div>
        </div>

        <!-- Zona de escritura de mensajes -->
        <div class="row mt-2">
          <div class="col">
            <DxTextBox v-model="messageChat" @enterKey="sendMessageTo()"></DxTextBox>
          </div>
          <div class="col-auto">
            <DxButton icon="mdi mdi-send" @click="sendMessageTo()"></DxButton>
          </div>
        </div>
      </div>
    </div>
    <!-- Resto de tu contenido -->
  </div>
</template>

<script>
import { DxButton } from "devextreme-vue/button";
import { avatares } from "./../assets/avatar/avatar";
import { DxTextBox } from "devextreme-vue/text-box";
import events from "./../../events";
import webSocketService from "./../shared/ws";
import { ref } from "vue";

export default {
  name: "ChatCard",
  props: {
    userTo: {
      type: String,
    },
    username: {
      type: String,
    },
  },
  setup(props) {
    const avatar = avatares[Math.floor(Math.random() * avatares.length)];
    const { sendMessage, onMessage } = webSocketService();
    const messageChat = ref("");

    function sendMessageTo() {
      sendMessage({
        eventName: events.SEND_PRIVATE_MESSAGE,
        message: messageChat.value,
        userTo: props.userTo,
        userFrom: props.username,
      });
    }

    onMessage((msg) => {
      debugger;
      console.log("EOOOOOOOOO");
      if (msg.eventName === events.SEND_PRIVATE_MESSAGE) {
        alert(msg);
      }
    });

    return {
      avatar,
      sendMessageTo,
      messageChat,
    };
  },
  components: {
    DxButton,
    DxTextBox,
  },
};
</script>

<style>
.content-chat {
  position: relative;
}

.window-chat {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 400px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.header-chat {
  background-color: #4caf50;
  color: #fff;
  padding: 10px;
  text-align: center;
}

.body-chat {
  padding: 20px;
}
</style>
