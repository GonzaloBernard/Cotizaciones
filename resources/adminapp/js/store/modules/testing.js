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
            'ClientesSingle/updateData',
            { },
            { root: true }
          )
        dispatch(
            'ClientesIndex/fetchIndexData',
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
