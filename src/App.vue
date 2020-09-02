<template>
  <div id="app">
    <div>
      <b-navbar toggleable="md" type="dark" variant="dark">
        <b-navbar-toggle target="nav collapse"></b-navbar-toggle>
        <b-navbar-brand to="/">My Vue App</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/posts-manager">Posts Manager</b-nav-item>
            <b-nav-item href="#" @click.prevent="login" v-if="!activeUser">Login</b-nav-item>
            <b-nav-item href="#" @click.prevent="logout" v-else>Logout</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar> 
      <!-- Routes will be rendered here -->
      <router-view />
    </div>
    <div>
      <nav class="navbar navbar-expand navbar-dark bg-dark">
          <a href="#" class="navbar-brand">Unauthenticated Navbar</a>
          <div class="navbar-nav mr-auto">
            <li class="nav-item">
              <a href="/tutorials" class="nav-link">Tutorials</a>
            </li>
            <li class="nav-item">
              <a href="/add" class="nav-link">Add</a>
            </li>
          </div>
        </nav>

        <div class="container mt-3">
          <router-view />
        </div>
        
        <img alt="Vue logo" src="./assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        activeUser: null
      }
    },
    async created() {
      await this.refreshActiveUser()
    },
    watch: {
      // Eachtime a route is changed, refresh activeUser
      '$route': 'refreshActiveUser'
    },
    methods: {
      login () {
        this.$auth.loginRedirect()
      },
      async refreshActiveUser () {
        this.activeUser=await this.$auth.getUser()
      },
      async logout () {
        await this.$auth.logout()
        await this.refreshActiveUser()
        this.$router.push('/')
      }
    }
  }
</script>

// Old script
/* <script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

 */
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
