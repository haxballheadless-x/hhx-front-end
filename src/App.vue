<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-expand-lg">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <font-awesome-icon :icon="['fa', 'bars']" style="font-size: 30px"></font-awesome-icon>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a
                class="nav-link"
                href="https://twitter.com/hheadlessx"
                style="font-size: 30px; color: #1DA1F2"
                target="_blank"
              >
                <font-awesome-icon :icon="['fab', 'twitter']"></font-awesome-icon>
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="https://github.com/haxballheadless-x"
                style="font-size: 30px; color: #333"
                target="_blank"
              >
                <font-awesome-icon :icon="['fab', 'github']"></font-awesome-icon>
              </a>
            </li>
          </ul>
          <div class="form-inline my-2 my-lg-0">
            <button
              @click="logout"
              class="btn btn-danger"
              :class="themeState ? 'btn-light' : 'btn-dark'"
              v-if="this.$session.exists()"
            >Logout</button>
            <button
              @click="changeTheme"
              class="btn"
              v-if="!themeState"
              style="font-size: 30px; color: #333"
            >
              <font-awesome-icon :icon="['fa', 'cloud-sun']"></font-awesome-icon>
            </button>
            <button @click="changeTheme" class="btn" v-else style="font-size: 30px; color: #333">
              <font-awesome-icon :icon="['fa', 'cloud-moon']"></font-awesome-icon>
            </button>
            <img
              :src="this.$session.get('avatar_url')"
              class="mr-sm-2 rounded-circle img-responsive m-1"
              width="50px"
              v-if="this.$session.exists()"
            />
          </div>
        </div>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faCloudMoon, faCloudSun, faBars } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

library.add(faGithub, faTwitter, faCloudMoon, faCloudSun, faBars)

export default {
  name: 'App',
  data () {
    return {
      themeState: JSON.parse(localStorage.getItem('theme'))
    }
  },
  components: {
    'font-awesome-icon': FontAwesomeIcon
  },
  methods: {
    logout () {
      this.$session.destroy()
      this.$router.push('/')
    },
    changeTheme () {
      if (JSON.parse(localStorage.getItem('theme'))) {
        localStorage.setItem('theme', false)
      } else {
        localStorage.setItem('theme', true)
      }
      window.location.reload()
    }
  },
  beforeCreate () {
    if (localStorage.getItem('theme') == null) {
      return localStorage.setItem('theme', true)
    }
  }
}
</script>

<style>
body,
html,
#app {
  max-width: 100%;
  overflow-x: hidden;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 0px;
  background-color: rebeccapurple;
}
</style>
