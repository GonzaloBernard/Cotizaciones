const set = key => (state, val) => {
  state[key] = val
}

function initialState() {
  return {
    data: [],
    total: 0,
    query: {},
    loading: false,
    dolar: null,
  }
}

const route = 'products'

const getters = {
  getDolar: state => state.dolar,
  data: state => state.data,
  total: state => state.total,
  loading: state => state.loading
}
const actions = {
  async fetchIndexData({ commit, state, dispatch }) {
    commit('setLoading', true)
    dispatch('ProductCategoriesIndex/fetchIndexData', null, {root: true})
    await axios
      .get("https://dummyjson.com/products", { params: state.query })
      .then(response => {
 /*        commit('setData', response.data.data) */
        commit('setData', response.data.products)
        commit('setTotal', response.data.total)
      })
      .catch(error => {
        message = error.response.data.message || error.message
        // TODO error handling
      })
      .finally(() => {
        commit('setLoading', false)
      })
  },
  destroyData({ commit, state, dispatch }, id) {
    axios
      .delete(`${route}/${id}`)
      .then(response => {
        dispatch('fetchIndexData')
      })
      .catch(error => {
        message = error.response.data.message || error.message
        // TODO error handling
      })
  },

  fetchDolar({commit})
  {
    axios
    .get("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
    .then((response) => {
      let dolar = response.data.find((a) => {
        return (a['casa'].nombre === 'Dolar Oficial')
      })['casa']

      commit("setDolar", dolar)
    })
  },

  setQuery({ commit }, value) {
    commit('setQuery', _.cloneDeep(value))
  },
  resetState({ commit }) {
    commit('resetState')
  }
}

const mutations = {
  setDolar(state, value)
  {
    state.dolar = value;
  },
  setData: set('data'),
  setTotal: set('total'),
  setQuery(state, query) {
    query.page = (query.offset + query.limit) / query.limit
    state.query = query
  },
  setLoading: set('loading'),
  resetState(state) {
    Object.assign(state, initialState())
  }
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
}
