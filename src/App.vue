<template>
  <v-app>
    <div id="app">
      <v-app-bar
        dense
      >
        <div id="nav">
          <span>MediStat</span> | 
          <router-link to="/diseases">Diseases</router-link> | 
          <router-link to="/symptoms">Symptoms</router-link> |
          <router-link to="/lifetables">Life Tables</router-link> | 
          <router-link to="/covid">COVID-19</router-link> 
        </div>
      </v-app-bar>
      <router-view/>
    </div>
  </v-app>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #E53935;
}
</style>
