<template>
  <div class="card" :class="themeState ? 'bg-white' : 'text-white bg-dark'">
    <div class="card-body">
      <img src="../assets/hhx_beta.png"  width="100%" />
      <div class="input-group">
        <input
          v-on:keyup.enter="useToken"
          v-model="token"
          class="form-control form-control-lg"
          type="text"
          placeholder="Enter your token"
        />
        <div class="input-group-prepend">
          <button @click="useToken" class="btn btn-white input-group-text text-dark"><font-awesome-icon icon="share" /></button>
        </div>
      </div>
      <span>or</span>

      <!-- Router link -->
      <router-link to="/generate" style="text-decoration: none; color: purple">Generate new token</router-link>
    </div>
    <div v-html="response" class="response text-uppercase text-center"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShare } from '@fortawesome/free-solid-svg-icons'

library.add(faShare)

export default {
  name: 'Home',
  data () {
    return {
      token: '',
      response: '',
      themeState: JSON.parse(localStorage.getItem('theme'))
    }
  },
  components: {
    'font-awesome-icon': FontAwesomeIcon
  },
  methods: {
    useToken () {
      return axios
        .post('http://localhost:3000/usetoken', {
          token: this.token
        })
        .then(e => {
          if (e.status === 200) {
            this.response = e.data.message
            this.$session.start()
            this.$session.set('token', this.token)
            this.$session.set('avatar_url', e.data.server.avatar_url)
            this.$session.set('logged', true)
            this.$router.push('/dashboard')
            Vue.http.headers.common['Authorization'] = 'Bearer ' + this.token
          }
        })
        .catch(e => {
          if (e.response.status === 422) {
            this.response = 'Invalid token'
          }
        })
    }
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
