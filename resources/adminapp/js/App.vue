<template>
  <router-view></router-view>
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
