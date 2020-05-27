<template>
  <div class="card" :class="themeState ? 'bg-white' : 'text-white bg-dark'">
    <div class="card-body">
      <img src="../assets/hhx_beta.png"  width="100%" />
      <div class="input-group mb-2">
        <input
          v-on:keyup.enter="register"
          v-model="haxball_tag"
          class="form-control form-control-lg"
          type="text"
          placeholder="Haxball nickname"
        />
      </div>
      <div class="input-group">
        <input
          v-on:keyup.enter="register"
          v-model="discord_tag"
          class="form-control form-control-lg"
          type="text"
          placeholder="Discord tag"
        />
        <div class="input-group-prepend">
          <button @click="register" class="btn btn-white input-group-text text-dark">
            <font-awesome-icon icon="share" />
          </button>
        </div>
      </div>

      <span>or</span>

      <!-- Router link -->
      <router-link to="/app" style="text-decoration: none; color: purple">Login</router-link>
    </div>
    <div v-html="response" class="response text-uppercase text-center"></div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

library.add(faShare)
export default {
  name: 'Generate',
  data () {
    return {
      haxball_tag: '',
      discord_tag: '',
      response: '',
      themeState: JSON.parse(localStorage.getItem('theme'))
    }
  },
  methods: {
    register () {
      return axios
        .post('http://localhost:3000/register', {
          haxball: this.haxball_tag,
          discord: this.discord_tag
        })
        .then(e => {
          if (e.status === 200) {
            this.response = e.data.message
          }
        })
    }
  },
  components: {
    'font-awesome-icon': FontAwesomeIcon
  },
  beforeCreate () {
    if (this.$session.exists()) {
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>
.card {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  box-shadow: 2px 2px #e134eb;
  width: 500px;
}

.hhx-title {
  text-shadow: 2px 2px purple;
  font-size: 80px;
}

.response {
  font-size: 20px;
}

@media only screen and (max-width: 600px) {
  .card {
    width: 300px;
  }
}
</style>
