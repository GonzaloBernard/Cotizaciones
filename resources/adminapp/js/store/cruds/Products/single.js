import firebase from '@/helpers/firebase'
function initialState() {
  return {
    entry: {
      id: null,
      name: '',
      description: '',
      price: '',
      categoria_id: 1,
      category: [],
      tag: [],
      iva: 21,
      img: null,
      stock:0,
      created_at: '',
      updated_at: '',
      deleted_at: ''
    },
    lists: {
      category: [],
      tag: []
    },
    loading: false
  }
}

const route = 'products'

const getters = {
  entry: state => state.entry,
  lists: state => state.lists,
  loading: state => state.loading
}

const actions = {
  storeData({ commit, state, dispatch }) {
    commit('setLoading', true)
    dispatch('Alert/resetState', null, { root: true })

    return new Promise((resolve, reject) => {
      let params = objectToFormData(state.entry, {
        indices: true,
        booleansAsIntegers: true
      })
      axios
        .post(route, params)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          let message = error.response.data.message || error.message
          let errors = error.response.data.errors

          dispatch(
            'Alert/setAlert',
            { message: message, errors: errors, color: 'danger' },
            { root: true }
          )

          reject(error)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    })
  },
  updateData({ commit, state, dispatch }) {
    commit('setLoading', true)
    dispatch('Alert/resetState', null, { root: true })

    return new Promise((resolve, reject) => {
      let params = objectToFormData(state.entry, {
        indices: true,
        booleansAsIntegers: true
      })
      params.set('_method', 'PUT')
      axios
        .post(`${route}/${state.entry.id}`, params)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          let message = error.response.data.message || error.message
          let errors = error.response.data.errors

          dispatch(
            'Alert/setAlert',
            { message: message, errors: errors, color: 'danger' },
            { root: true }
          )

          reject(error)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    })
  },

  async uploadImagen ({ commit }, { file, filename }) {
    if (!file) return null
    filename = Math.random()
    try {
      const storageBucket = firebase
        .storage()
        .ref()
        .child(`mipUploads/images/${Date.now()}-${filename}`)
      const snapshot = await storageBucket.put(file)
      const url = await snapshot.ref.getDownloadURL()
      commit('setImg', url)
      return url
    } catch (error) {
      console.log(error)
    }
  },

  setName({ commit }, value) {
    commit('setName', value)
  },
  setStock({commit}, value)
  {
    commit('setStock', value)
  },
  setDescription({ commit }, value) {
    commit('setDescription', value)
  },
  setPrice({ commit }, value) {
    commit('setPrice', value)
  },
  setCategory({ commit }, value) {
    commit('setCategory', value)
  },
  setTag({ commit }, value) {
    commit('setTag', value)
  },
  insertPhotoFile({ commit }, file) {
    commit('insertPhotoFile', file)
  },
  removePhotoFile({ commit }, file) {
    commit('removePhotoFile', file)
  },
  setCreatedAt({ commit }, value) {
    commit('setCreatedAt', value)
  },
  setUpdatedAt({ commit }, value) {
    commit('setUpdatedAt', value)
  },
  setDeletedAt({ commit }, value) {
    commit('setDeletedAt', value)
  },
  fetchCreateData({ commit }) {
    axios.get(`${route}/create`).then(response => {
      commit('setLists', response.data.meta)
    })
  },
  fetchEditData({ commit, dispatch }, id) {
    axios.get(`${route}/${id}/edit`).then(response => {
      commit('setEntry', response.data.data)
      commit('setLists', response.data.meta)
    })
  },
  fetchShowData({ commit, dispatch }, id) {
    axios.get(`${route}/${id}`).then(response => {
      commit('setEntry', response.data.data)
    })
  },
  resetState({ commit }) {
    commit('resetState')
  }
}

const mutations = {
  setEntry(state, entry) {
    state.entry = entry
  },
  setName(state, value) {
    state.entry.name = value
  },
  setDescription(state, value) {
    state.entry.description = value
  },
  setPrice(state, value) {
    state.entry.price = value
  },
  setCategory(state, value) {
    state.entry.category = value
  },
  setTag(state, value) {
    state.entry.tag = value
  },
  insertPhotoFile(state, file) {
    state.entry.photo.push(file)
  },
  setStock(state, value)
  {
    state.entry.stock = value
  },
  removePhotoFile(state, file) {
    state.entry.photo = state.entry.photo.filter(item => {
      return item.id !== file.id
    })
  },
  setCreatedAt(state, value) {
    state.entry.created_at = value
  },
  setUpdatedAt(state, value) {
    state.entry.updated_at = value
  },
  setImg(state, value)
  {
    console.log(value)
    state.entry.img = value;
  },
  setDeletedAt(state, value) {
    state.entry.deleted_at = value
  },
  setLists(state, lists) {
    state.lists = lists
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  resetState(state) {
    state = Object.assign(state, initialState())
  }
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
}
