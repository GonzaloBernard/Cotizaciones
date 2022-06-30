<template>
  <div class="container-fluid">
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header card-header-primary card-header-icon">
              <div class="card-icon">
                <i class="material-icons">edit</i>
              </div>
              <h4 class="card-title">
                {{ $t('global.edit') }}
                <strong>{{ $t('Empresa') }}</strong>
              </h4>
            </div>
            <div class="card-body">
              <back-button></back-button>
            </div>
            <div class="card-body">
              <bootstrap-alert />
              <div class="row">
                <div class="col-md-12">
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.nombre,
                      'is-focused': activeField == 'nombre'
                    }"
                  >
                    <label class="bmd-label-floating">{{
                      $t('cruds.contactCompany.fields.nombre')
                    }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :value="entry.nombre"
                      @input="updateNombre"
                      @focus="focusField('nombre')"
                      @blur="clearFocus"
                    />
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.cuit,
                      'is-focused': activeField == 'cuit'
                    }"
                  >
                    <label class="bmd-label-floating">{{
                      $t('cruds.contactCompany.fields.cuit')
                    }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :value="entry.cuit"
                      @input="updateCuit"
                      @focus="focusField('cuit')"
                      @blur="clearFocus"
                    />
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.company_website,
                      'is-focused': activeField == 'company_website'
                    }"
                  >
                    <label class="bmd-label-floating">{{
                      $t('cruds.contactCompany.fields.company_website')
                    }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :value="entry.company_website"
                      @input="updateCompanyWebsite"
                      @focus="focusField('company_website')"
                      @blur="clearFocus"
                    />
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.company_email,
                      'is-focused': activeField == 'company_email'
                    }"
                  >
                    <label class="bmd-label-floating">{{
                      $t('cruds.contactCompany.fields.company_email')
                    }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :value="entry.company_email"
                      @input="updateCompanyEmail"
                      @focus="focusField('company_email')"
                      @blur="clearFocus"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <vue-button-spinner
                class="btn-primary"
                :status="status"
                :isLoading="loading"
                :disabled="loading"
              >
                {{ $t('global.save') }}
              </vue-button-spinner>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      status: '',
      activeField: ''
    }
  },
  computed: {
    ...mapGetters('ClientesSingle', ['entry', 'loading'])
  },
  beforeDestroy() {
    this.resetState()
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler() {
        this.resetState()
        this.fetchEditData(this.$route.params.id)
      }
    }
  },
  methods: {
    ...mapActions('ClientesSingle', [
      'fetchEditData',
      'updateData',
      'resetState',
      'setCompanyName',
      'setCompanyAddress',
      'setCompanyWebsite',
      'setCompanyEmail'
    ]),
    updateNombre(e) {
      this.setCompanyName(e.target.value)
    },
    updateCuit(e) {
      this.setCompanyAddress(e.target.value)
    },
    updateCompanyWebsite(e) {
      this.setCompanyWebsite(e.target.value)
    },
    updateCompanyEmail(e) {
      this.setCompanyEmail(e.target.value)
    },
    submitForm() {
      this.updateData()
        .then(() => {
          this.$router.push({ name: 'contact_companies.index' })
          this.$eventHub.$emit('update-success')
        })
        .catch(error => {
          this.status = 'failed'
          _.delay(() => {
            this.status = ''
          }, 3000)
        })
    },
    focusField(name) {
      this.activeField = name
    },
    clearFocus() {
      this.activeField = ''
    }
  }
}
</script>
