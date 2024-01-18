<template>
  <div class="item-card m-4">
    <div class="container px-4">
      <div class="row gx-5">
        <div class="col p-3 title-card">{{ product.name }}</div>
      </div>
      <div class="row justify-content-center">
        <div class="col-12 p-3">
          <img :src="product.srcImage" class="img-redonda" v-bind:alt="product.name" />
        </div>
        <div class="col-12">{{ product.description }}</div>
      </div>

      <hr class="mb-3" />

      <div class="row justify-content-center">
        <div class="col">
          <dx-button text="Pujar + 5€" type="success" stylingMode="outlined" icon="arrowup" @click="sendMessage(product)"></dx-button>
        </div>
        <div class="col price">{{ product.price }}€</div>
      </div>
    </div>
  </div>
</template>

<script>
import { DxButton } from "devextreme-vue/button";

export default {
  name: "CardInfoComponent",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  emits: ["sendMessage"],
  setup(props, { emit }) {
    function sendMessage(product) {
      emit("sendMessage", product);
    }

    return {
      sendMessage,
    };
  },
  components: {
    DxButton,
  },
};
</script>

<style scoped>
.item-card {
  background: rgb(34, 193, 195);
  background: linear-gradient(149deg, rgba(34, 193, 195, 1) 0%, rgba(239, 241, 240, 1) 34%, rgba(242, 230, 202, 1) 62%, rgba(253, 187, 45, 1) 100%);
  height: 475px;
  width: 320px;
  border-radius: 20px;
}

.img-redonda {
  width: 220px;
  height: 220px;
  border-radius: 150px;
}

.title-card {
  padding-top: 0.06em;
  font-family: "Sharp Grotesk 25", sans-serif;
  font-size: 30px;
  font-weight: 600;
  line-height: 1;
  display: flex;
  justify-content: center;
  word-break: keep-all;
  text-align: center;
}

.dx-button {
  color: white !important;
  font-size: large;
  border: 1px solid black !important;
  background-color: black !important;
  border-radius: 20px;
  width: 150px;
}

.price {
  font-size: 25px;
  font-weight: 600;
  border: 1px solid black;
  border-radius: 20px;
  margin: 0px 10px;
  text-align: center;
}

hr {
  height: 2px;
  width: 100%;
  background-color: black;
  color: black !important;
}
</style>
