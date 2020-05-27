<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md rounded m-3" :class="themeState ? 'bg-light' : 'text-white bg-dark'">
          <h3 class="m-3">Usage</h3>
          <hr />
          <div class="spinner-border spinner-border-lg m-5" v-if="isLoading" style="align-text: center" />
          <div v-if="!isLoading">
            <p>Copy and paste this codes:</p>
            <pre class="language-javascript">
{{packageCode}}

//{{version}}</pre>
            <h4 class="m-3">Example</h4>
            <pre class="language-javascript">{{loader}}</pre>
            <hr />
            <h3 class="p-3">Classes</h3>
            <div style="text-align: left">
              <kbd>&lt;Loader&gt;.getAnalysis()</kbd> -
              <i>Returns room data</i>
            </div>
            <div style="text-align: left">
              <kbd>&lt;Loader&gt;.connectData(player: Player, define: boolean)</kbd> -
              <i>Returns room data</i>
            </div>
            <div style="text-align: left">
              <kbd>&lt;Loader&gt;.getRoomLink()</kbd> -
              <i>Returns room link</i>
            </div>
            <hr />
            <h3 class="p-3">Troubleshooting</h3>
            <h5 class="p-1">HTTP Codes</h5>
            <div style="text-align: left">
              <kbd>401</kbd> -
              <i>
                Invalid token.
                <span>Or</span> the plan has exceeded its limit
              </i>
            </div>
          </div>
        </div>
        <div class="col-md rounded m-3" :class="themeState ? 'bg-light' : 'text-white bg-dark'">
          <h3 class="m-3">Analytics</h3>
          <hr />
          <div class="spinner-border spinner-border-lg m-5" v-if="isLoading" />
          <div class="card p-3" :style="themeState ? '' : 'background-color: #343c4a; color: white'" v-if="!isLoading">
            <div class="card-body">
              <div>
                <button @click="getData" class="btn m-1" :style="themeState ? 'color: black' : 'color: white'">Atualizar</button>
                <ul class="list-group">
                  <li class="list-group-item" :style="themeState ? '' : 'background-color: #323b4d; color: white'">
                    Room link:
                    <a
                      :href="analytics.link"
                      target="_blank"
                      style="text-decoration: none"
                    >{{analytics.link}}</a>
                  </li>
                  <li class="list-group-item" :style="themeState ? '' : 'background-color: #323b4d; color: white'">
                    Online users: {{analytics.onlineUsers.length}}
                    <button
                      @click="resetOnlineUsers('onlineUsers')"
                      class="btn"
                      style="margin-left: 5px; color: red"
                    >
                      <font-awesome-icon icon="trash"></font-awesome-icon>
                    </button>
                  </li>
                  <li class="list-group-item" :style="themeState ? '' : 'background-color: #323b4d; color: white'">
                    Total users in the last 24 hours:
                    <span style="color: red; font-size: 40">Coming soon</span>
                  </li>
                  <li class="list-group-item" :style="themeState ? '' : 'background-color: #323b4d; color: white'">
                    Total users in the last week:
                    <span style="color: red; font-size: 40">Coming soon</span>
                  </li>
                  <li class="list-group-item" :style="themeState ? '' : 'background-color: #323b4d; color: white'">Total users: {{ analytics.totalUsers }}</li>
                </ul>
              </div>
            </div>
          </div>
          <Timeline class="p-3" id="hheadlessx" sourceType="profile" :options="{ tweetLimit: '3', theme: themeState ? 'light' : 'dark' }"/>
        </div>
      </div>
    </div>
</template>

<script>
import 'vue-code-highlight/themes/duotone-sea.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Timeline from 'vue-tweet-embed/src/timeline'

library.add(faTrash)
export default {
  name: 'Dasboard',
  data () {
    return {
      token: '',
      analytics: {},
      isLoading: true,
      version: '',
      packageCode: '',
      loader: '',
      themeState: JSON.parse(localStorage.getItem('theme'))
    }
  },
  components: {
    'font-awesome-icon': FontAwesomeIcon,
    Timeline
  },
  mounted () {
    this.token = this.$session.get('token')
    this.getData()
  },
  methods: {
    getData () {
      axios
        .get(`http://localhost:3000/getdata?value=server&token=${this.token}`)
        .then(response => {
          this.analytics = response.data
          this.isLoading = false
        })
      axios
        .get(`http://localhost:3000/getdata?value=code&version=last`)
        .then(response => {
          this.packageCode = response.data.packageCode
          this.version = response.data.version
          this.loader = decodeURIComponent(response.data.loaderCode).replace(':token:', this.token)
          this.isLoading = false
        })
    },
    resetOnlineUsers (value) {
      axios
        .post(`http://localhost:3000/updatedata`, {
          token: this.token,
          value
        })
        .then(response => {
          this.getData()
        })
    }
  },
  beforeCreate () {
    if (!this.$session.exists()) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

@media only screen and (max-width: 600px) {
  pre {
    width: calc(var(--vh, 0.43vh) * 100);
  }
  .col-md {
    width: 91.9%;
  }
}
</style>
