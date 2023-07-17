<template>
  <div id="app">
    <header>
      <img src="https://via.placeholder.com/700x200.jpg">
    </header>
    <nav>
      <div id="left-nav">
      <router-link id="home" v-bind:to="{name: 'home'}">Home</router-link>
      <router-link id="cart" v-bind:to="{name: 'cart'}" >Cart</router-link>
      </div>
      <span>{{$store.state.message}}</span>
      <div id="right-nav">
      <router-link id="logout" v-bind:to="{ name: 'logout' }" v-if="$store.state.token">Logout</router-link>
      <router-link id="login" v-bind:to="{ name: 'login' }" v-else>Login</router-link>
      </div>
    </nav>
    <main>
      <router-view />
    </main>
    <footer>&copy; 2023 All rights reserved</footer>
  </div>
</template>

<style scoped>

#app{
    padding-top: 270px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 50px;
    width: calc(100%-40px);
    height: 597px;
    overflow: auto;
    border: 2px solid black;
}


header {
    display: flex;
    justify-content: center;
    margin-left: -20px;
    width: 97%;
    position: fixed;
    top: 10px;
    background-color:white;
    padding: 10px;

}
nav{
    top: 230px;
    display: flex;
    position: fixed;
    background-color:white;
    justify-content: center;
    width: 98.8%;
    height: 30px;
    margin-left: -20px;
    border: 2px solid black;
    font-family:cursive;
}
span{
    flex-grow: 1;
    text-align: center;
      font-family: cursive;

}
#left-nav>a{
padding:15px 25px 5px 25px;
text-decoration: none;
color: black;
font-weight: bolder;
}
#left-nav>a:hover{
    color: blue;
}

#right-nav>a{
padding:15px 25px 5px 25px;
text-decoration: none;
color: black;
font-weight: bolder;
}
#right-nav>a:hover{
    color: blue;
}


footer{
    position: fixed;
    bottom: 0;
    margin-left: -21px;
    width: 99%;
    background-color: white;
    border: 1px solid black;
    color:gray;
    font-family: cursive;
}




</style>