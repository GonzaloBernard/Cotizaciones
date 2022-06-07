function getDefaultState() {
    return {
      }
  }

  const getters = {
  }
  const route = 'clientes'
  const actions = {

    test({dispatch}){
        dispatch(
            'ProductsIndex/fetchIndexData',
            { },
            { root: true }
          )
    }
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
