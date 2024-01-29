<template>
  <div class="row header">
    <div class="col-auto">
      <div class="user-card">Usuario: {{ username }}</div>
      <div class="users-online">Otros usuarios conectados:</div>
      <div class="list">
        <DxList :height="87" :width="200" :dataSource="listOfUsers" @itemClick="onItemClick($event)"> </DxList>
      </div>
    </div>
    <div class="col-1 align-items-center d-flex arrow-img">test</div>
    <div class="col-3 align-items-center d-flex text-chat">
      <div class="col">Comunícate con algún usuario del chat haciendo doble click</div>
    </div>
    <div class="col title-web">Puja de viajes</div>
  </div>

  <ChatCard v-if="openChat" :userTo="userTo" :username="username"></ChatCard>
</template>

<script>
import { DxList } from "devextreme-vue";
import { ref } from "vue";
import ChatCard from "./ChatCard.vue";

export default {
  name: "Header",
  props: {
    username: {
      type: String,
    },
    listOfUsers: {
      type: Array,
    },
  },
  setup() {
    const openChat = ref(false);
    const userTo = ref("");

    function onItemClick(e) {
      userTo.value = e.itemData;
      openChat.value = true;
    }

    return {
      openChat,
      userTo,
      onItemClick,
    };
  },
  components: {
    ChatCard,
    DxList,
  },
};
</script>

<style>
.header {
  height: 150px;
  background-color: black !important;
  width: 100%;
}

.user-card {
  background-color: white;
  margin-top: 5px;
  padding: 5px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  margin-left: 5px;
  font-weight: 600;
  background-color: wheat;
}

.users-online {
  margin-left: 5px;
  background-color: white;
  padding: 2px 5px;
  border-top: 1px solid #ddd;
  font-weight: 600;
  background-color: rgb(152, 236, 236);
}

.list {
  background-color: white;
  margin-left: 5px;
}

.arrow-img {
  mask: url("./../assets/arrow.svg");
  -webkit-mask: url("./../assets/arrow.svg");
  -webkit-mask-size: cover;
  mask-size: cover;
  height: 140px !important;
  width: 170px !important;
  background-color: white;
}

.text-chat {
  font-size: 25px;
  color: white;
  text-align: center;
}

.title-web {
  color: white;
  font-size: 100px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  text-align: center;
  justify-content: center;
}
</style>
