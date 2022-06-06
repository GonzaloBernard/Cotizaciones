function getDefaultState() {
    return {
        entry: {
          id: null,
          nombre: 'Cliente 10',
          cuit: '52222222222',
          created_at: '',
          updated_at: '',
          deleted_at: ''
        },
        lists: {
        },
        loading: false
      }
  }

  const getters = {
  }
  const route = 'clientes'
  const actions = {
    test({ state }, message) {
        return new Promise((resolve, reject) => {
            let params = objectToFormData(state.entry, {
              indices: true,
              booleansAsIntegers: true
            })
            axios
              .post(route, params)
              .then(response => {
                console.log(response)
                resolve(response)
              })
              .catch(error => {
                let message = error.response.data.message || error.message
                let errors = error.response.data.errors

                reject(error)
              })
              .finally(() => {
                //commit('setLoading', false)
              })
          })

    },
  }

  const mutations = {
    resetState(state) {
      state = Object.assign(state, getDefaultState())
    }
  }

  export default {
    namespaced: true,
    state: getDefaultState,
    getters,
    actions,
    mutations
  }
