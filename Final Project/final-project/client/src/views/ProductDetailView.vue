<template>
  <div>
    <div class="top-line">
      <h1 class="name">{{ product.name }}</h1>
      <loading-spinner id="spinner" v-bind:spin="isLoading" />
      <button class="button" v-if=isLoggedIn v-on:click="addToCart(product)">
        <font-awesome-icon
          class="button-hover"
          icon="fa-solid fa-cart-plus"
          />Add To Cart </button>
    </div>
      <div class="details">{{product.description}}</div>
      <div class="sku-price">
        <div class="sku">{{product.productSku}}</div>
        <div class="price">{{currency(product.price)}}</div>
      </div>
      <div class="prodName">{{product.name}}</div>
    <img class="productImg" :src="product.imageName" />
  </div>
</template>

<script>
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ProductService from "../services/ProductService.js";
import CartService from "../services/CartService.js";
export default {
  name: "ProductDetailView",
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: false,
      product: null,
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    },
  },

  methods: {
    getData() {
      this.isLoading = true;
      ProductService.getProductById(this.$route.params.id).then((response) => {
        this.product = response.data;
        this.isLoading = false;
      });
    },
    addToCart(product) {
      CartService.addItemToCart({
        productId: product.productId,
        quantity: 1,
      }).then(() => {
        this.$store.commit(
          "SET_MESSAGE",
          "Item " + product.productId + " added to Cart!"
        );
      });
    },
    currency(value){
        return new Intl.NumberFormat(`en-US`, {
        currency: `USD`,
        style: "currency",
    }).format(value);
    }
  },

  created() {
    this.$store.commit("CLEAR_MESSAGE");
    this.getData();
  },
};
</script>

<style>
#spinner {
  color: green;
}
.top-line {
  display: flex;
}
.name {
  flex-grow: 1;
  font-size: 2rem;
  font-weight: bolder;
  margin: 0;
  font-family: cursive;
  padding-bottom: 20px;
}
button {
  font-family: cursive;
  border-radius: 10px;
  background-color: white;
  width: 200px;
  height: 40px;
}
.sku-price {
  display: flex;
  gap: 10px;
  padding-bottom: 10px;
} 
.sku{
font-family: cursive;
font-size: 1.5rem;
padding-right: 75px;
}
.price{
font-family: cursive;
font-size: 1.5rem;
}
.productImg {
  border-radius: 50px;
  padding: 10px;
}
.details {
  font-family: cursive;
  font-size: 1.8rem;
  padding-bottom: 10px;
}
.prodName{
    font-family: cursive;
    font-size: 1.5rem;
}
.button-hover{
  cursor: pointer;
}
</style>