function getDefaultState() {
    return {
    }
  }

  const getters = {
  }
  const route = 'clientes'
  const actions = {
    test({ commit }, message) {
        axios
          .get(route, {})
          .then(response => {
            console.log(response.data)
          })
          .catch(error => {
            message = error.response.data.message || error.message
            // TODO error handling
          })
          .finally(() => {

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
