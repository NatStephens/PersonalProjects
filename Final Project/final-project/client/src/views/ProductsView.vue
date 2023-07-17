<template>
  <div class="home">
    <div id="heading-line">
      <h1>
        Products
        <loading-spinner id="spinner" v-bind:spin="isLoading" />
      </h1>

      <font-awesome-icon
        v-bind:class="{ 'view-icon': true, active: cardView }"
        v-on:click="cardView = true"
        icon="fa-solid fa-grip"
        title="View tiles"
      />

      <font-awesome-icon
        v-bind:class="{ 'view-icon': true, active: !cardView }"
        v-on:click="cardView = false"
        icon="fa-solid fa-table"
        title="View table"
      />

      <div class="search-bar" >
      <i class="fa-solid fa-magnifying-glass"></i>
     <input type="text" placeholder="Search..." v-model="searchTerm" v-on:keydown="searchProduct"/>
     
      </div>
    </div>

    <div v-if="cardView" class="card-container">
      <div
        v-for="product in products"
        v-bind:key="product.productId"
        class="card"
      >
        <div class="top-line">
          <div class="sku">{{ product.productSku }}</div>
          <div class="price">{{ currency(product.price) }}</div>
        </div>
        <router-link
          :to="{ name: 'productdetail', params: { id: product.productId } }">
          <div class="name">{{ product.name }}</div>
          <img :src="product.imageName" />
        </router-link>
      <div class="cart-icon" v-if=isLoggedIn>
        <font-awesome-icon class="cart-hover" icon="fa-solid fa-cart-plus" v-on:click="addToCart(product)" />
      </div>
      </div>
    </div>

    <div v-if="!cardView">

      <table class="list">
        <thead class="list-heading">
          <tr>
            <th>SKU</th>
            <th>Product</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" v-bind:key="product.productId" class="list-item">
            <td>{{product.productSku}}</td>
            <td>
              <router-link :to="{ name: 'productdetail', params: { id: product.productId } }">
                {{product.name}}
              </router-link>

            </td>
            <td>{{currency(product.price)}}</td>
            <td><font-awesome-icon class="cart-hover" icon="fa-solid fa-cart-plus" v-if=isLoggedIn v-on:click="addToCart(product)"/></td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ProductService from "../services/ProductService.js";
import CartService from "../services/CartService.js";
export default {
  name: "ProductsView",
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      searchTerm: "",
      isLoading: false,
      cardView: true,
      products: [],
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
      ProductService.getProducts().then((response) => {
        this.products = response.data;
        this.isLoading = false;
      })
    },
    addToCart(product){
      CartService.addItemToCart({productId: product.productId, quantity: 1}).then(() =>{
        this.$store.commit('SET_MESSAGE', "Item " + product.productId + " added to Cart!")
      })
    },
    currency(value){
        return new Intl.NumberFormat(`en-US`, {
        currency: `USD`,
        style: "currency",
    }).format(value);
    },
    searchProduct(event){
      if(event.key === "Enter"){
        this.isloading = true;
        if(this.searchTerm){
        ProductService.searchProduct(this.searchTerm).then((response) =>{
          this.products = response.data;
          this.isLoading = false;
        })
        } else{
          this.getData();
        }
      }
    }
  },

  created() {
    this.$store.commit("CLEAR_MESSAGE");
    this.getData();
  },
};
</script>

<style scoped>
#spinner {
  color: green;
}
#heading-line {
  display: flex;
}
h1 {
  flex-grow: 1;
  font-size: 2rem;
  font-weight: bolder;
  margin: 0;
  font-family: cursive;
}

#search-bar {
  height: 25px;
  padding-left: 10px;
}

.view-icon {
  font-size: 2rem;
  margin-right: 7px;
  padding: 3px;
  color: #444;
  border-radius: 3px;
}

.view-icon.active {
  background-color: lightgreen;
}

.view-icon:not(.active) {
  font-size: 2rem;
  margin-right: 7px;
  cursor: pointer;
}

.view-icon:not(.active):hover {
  color: blue;
  background-color: rgba(255, 255, 255, 0.7);
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
}
.card {
  display: flex;
  flex-direction: column;
  border: solid 1px black;
  padding: 8px;
}
.top-line {
  display: flex;
  padding: 5px;
}
.sku {
  flex-grow: 1;
  font-family: cursive;
}
.price {
  font-family: cursive;
}
.name{
  font-family: cursive;
}
img{
  border-radius: 50px;
  padding: 10px;
}
.cart-icon{
  display: flex;
  justify-content: flex-end;
}

.list {
  width: 800px;
}
th{
  text-align: left;
  font-family: cursive;
}
td{
  font-family: cursive;
}
.cart-hover{
  cursor: pointer;
}
</style>



 <!-- <h2>Loading spinner demonstration</h2>
    <p>
      This is a demonstration of how you can show or hide a "spinner" icon to
      let the user know something is happening. Before calling an API, you'd set
      the data property <code>isLoading</code> to <code>true</code>. When the
      call completes, set it to <code>false</code>.
    </p>
    <p>
      For this demonstration, clicking the checkbox below sets
      <code>isLoading</code> to <code>true</code>, so it simulates what the user
      would see when your app is accessing an API.
    </p>
    <input type="checkbox" name="loading" id="loading" v-model="isLoading" /> Is
    Loading
    <p id="login-message" v-if="!isLoggedIn">
      Welcome! You may browse anonymously as much as you wish,<br />
      but you must
      <router-link v-bind:to="{ name: 'login' }">Login</router-link> to add
      items to your shopping cart.
    </p>
    <h2>Font-awesome demonstration</h2>
    <p>
      This code shows you how you can include Font-awesome icons on your page. Below are two icons: 
      one to indicate a "tile" view of products, and another to indicate a "table" view. There's also a little bit
      of styling to get you started, but you can style it your own way. And there's a property to track which view is "active".
    </p> -->
    