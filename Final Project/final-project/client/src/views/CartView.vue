<template>
<div>
  <div class="top-line">
      <h1>Shopping Cart</h1>
      <loading-spinner id="spinner" v-bind:spin="isLoading" />
      <button class="button" v-on:click="clearCart()">
        <font-awesome-icon
          class="cart-hover"
          icon="fa-solid fa-trash-can"/>Clear Cart </button>
 </div>
 <div>
<table class="cartList">
        <thead class="cartHeading">
          <tr>
            <th>Quantity</th>
            <th>Product</th>
            <th>Price</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart.items" v-bind:key="item.cartItemId">
            <td>{{item.quantity}}</td>
            <router-link :to="{ name: 'productdetail', params: { id: item.product.productId } }">
            <td>{{item.product.name}}</td>
            </router-link>
            <td>{{currency(item.product.price)}}</td>
            <td>{{currency(item.quantity * item.product.price)}}</td>
            <td>
                <button class="x-hover" v-on:click="removeFromCart(item.cartItemId)">
                <font-awesome-icon icon="fa-solid fa-xmark"/>
                </button>
                </td>
            </tr>
        </tbody>
      </table>
      <hr>
      <div class="subtotal">
          <div class="subtotalWord">Subtotal</div>
          <div class="subtotalNumber">{{currency(cart.itemSubtotal)}}</div>
      </div>
      <div class="taxes">
          <div class="taxWord">Tax</div>
          <div class="taxNumber">{{currency(cart.tax)}}</div>
      </div>
      <div class="totaledUp">
          <div class="totalWord">Total</div>
          <div class="totalNumber">{{currency(cart.total)}}</div>
      </div>


 </div>

</div>
    
</template>

<script>
import LoadingSpinner from "../components/LoadingSpinner.vue";
import CartService from "../services/CartService.js";
export default {
  name: "CartView",
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: false,
      cart: {}
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    },
  },

  methods: {
       getData(){
      this.isLoading = true;
       CartService.getCart().then((response) =>{
        this.cart = response.data;
        this.isLoading = false;
      })
    },
    clearCart(){
        CartService.clearCart().then(() => {
        this.$store.commit(
          "SET_MESSAGE", "Cart cleared!",
        );
        this.getData();
      });
    },
    removeFromCart(id){
        CartService.removeItemFromCart(id).then(() => {
        this.$store.commit(
          "SET_MESSAGE",
         "Item removed from Cart!"
        ); 
        this.getData();
      });
    },
    currency(value){
        if(isNaN(value)){
        return "";
        }else return new Intl.NumberFormat(`en-US`, {
        currency: `USD`,
        style: "currency",
    }).format(value);
    }
  },

  created() {
    this.$store.commit('CLEAR_MESSAGE');
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
h1{
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
  cursor: pointer;
}
th{
    text-align: left;
  font-family: cursive;
}
.cartList{
    width: 800px;
}
.subtotal{
display: flex;
padding-bottom: 10px;
}
.subtotalWord{
padding-left: 120px;
}
.subtotalNumber{
padding-left: 245px;
}
.taxes{
display: flex;
padding-bottom: 10px;
}
.totaledUp{
display: flex;
padding-bottom: 10px;
}
.taxWord{
padding-left: 120px;
}
.taxNumber{
padding-left: 282px;
}
.totalWord{
padding-left: 120px;
}
.totalNumber{
padding-left: 270px;}
.x-hover{
    cursor: pointer;
    border: none;
}
</style>