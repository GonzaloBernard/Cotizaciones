<template>
  <div class="container-fluid">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header card-header-primary card-header-icon">
              <div class="card-icon">
                <i class="material-icons">language</i>
              </div>
              <h4 class="card-title">
                {{ $t('global.dashboard') }}
              </h4>
            </div>
            <div class="card-body">
              <h3>Bienvenido al sistema MIP</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
    created()
  {
    // || NO BORRAR
    // || TESTING --------------------------------------

    this.$store.dispatch("Testing/test")

    // || TESTING --------------------------------------
    // || NO BORRAR
  },
}
</script>
