<template>
  <div id="login">
    <form v-on:submit.prevent="login">
      <h1 class="loginH1">Please Sign In</h1>
      <div id="fields">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          v-model="user.username"
          required
          autofocus
        />
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          v-model="user.password"
          required
        />
        <div><button type="submit">Sign in</button></div>
      </div>
      <hr/>
      Need an account? <router-link v-bind:to="{ name: 'register' }">Register!</router-link>
    </form>
  </div>
</template>

<script>
import authService from "../services/AuthService";

export default {
  name: "LoginView",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      authService
        .login(this.user)
        .then((response) => {
          if (response.status == 200) {
            this.$store.commit("SET_AUTH_TOKEN", response.data.token);
            this.$store.commit("SET_USER", response.data.user);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          const response = error.response;
          if (!response) {
            alert(error);
          } else if (response.status === 401) {
            alert("Invalid username and password!");
          } else {
            alert(response.message);
          }
        });
    },
  },
};
</script>

<style scoped>
#login{
  width: 100%;
  display: flex;
  justify-content: center;
 
}
form{
  width: 400px;
  border: 3px solid black;
  padding: 20px;
  
}
#fields{
  display: flex;
  flex-direction: column;
}
input{
  margin: 10px;
  padding: 10px;
}
div{
   margin-left: 15px;
  display: flex;
  justify-content: center;
  width: 350px;
}
.loginH1{
  margin-left: 75px;
}

</style>
