function getDefaultState() {
    return {
      }
  }

  const getters = {
  }
  const route = 'clientes'
  const actions = {

    test({dispatch}){
        /* dispatch(
            'CotizacionesSingle/postCotizacionCliente',
            { },
            { root: true }
          ) */

/*           dispatch(
            'CotizacionesSingle/storeData',
            { },
            { root: true }
          ) */
/*         dispatch(
            'ClientesSingle/updateData',
            { },
            { root: true }
          )
        dispatch(
            'ClientesIndex/fetchIndexData',
            { },
            { root: true }
          ) */


        /*   axios
          .get('/product-sections', {  })
          .then(response => {
            console.log(response.data)
          }) */



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
