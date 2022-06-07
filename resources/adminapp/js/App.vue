<template>
<v-app>
  <router-view></router-view>
</v-app>
</template>

<script>
export default {
    created()
  {
    this.$store.dispatch("ProductsIndex/fetchDolar")
  },
}
</script>

<style>

.v-application ol, .v-application ul {
  padding-left: 0px !important;
}
</style>
