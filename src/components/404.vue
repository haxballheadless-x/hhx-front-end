<template>
  <div class="container rounded" :class="themeState ? 'bg-white' : 'bg-dark'">
    <div class="text-center p-5">
      <h1 class="text-danger">404 ERROR</h1>
      <h5 class="text-warning">INVALID ROUTE</h5>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      themeState: JSON.parse(localStorage.getItem('theme'))
    }
  }
}
</script>

<style scoped>
.container {
  width: 90%;
  margin-top: 5%;
  position: relative;
}
</style>
