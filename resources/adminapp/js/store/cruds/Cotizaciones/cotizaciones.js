const set = (key) => (state, val) => {
    state[key] = val;
};

function initialState() {
    return {
        data: [],
        cotizacionSinConfirmar: [],
        total: 0,
        query: {},
        loading: false,
        stockError: false
    }
}

const route = "cotizacion";

const getters = {
    data: (state) => state.data,
    total: (state) => state.total,
    loading: (state) => state.loading,
    getCotizacionParcial: (state) => state.cotizacionSinConfirmar,
    getStockError: (state) => state.stockError
}

const actions = {
    fetchIndexData({ commit, state }) {
        commit("setLoading", true);
        axios
            .get(route)
            .then((response) => {
                commit("setData", response.data.data);
                commit("setTotal", response.data.data.length);
            })
            .catch((error) => {
                message = error.response.data.message || error.message;
                // TODO error handling
            })
            .finally(() => {
                commit("setLoading", false);
            });
    },

    addProductToPartialCotization({commit}, prod)
    {
        commit('addProductToPartialCotization', prod)
    },

    destroyData({ commit, state, dispatch }, id) {
        axios
            .delete(`${route}/${id}`)
            .then((response) => {
                dispatch("fetchIndexData");
            })
            .catch((error) => {
                message = error.response.data.message || error.message;
                // TODO error handling
            });
    },
    setQuery({ commit }, value) {
        commit("setQuery", _.cloneDeep(value));
    },
    resetState({ commit }) {
        commit("resetState");
    },
};

const mutations = {
    setData: set("data"),
    setTotal: set("total"),
    setQuery(state, query) {
        query.page = (query.offset + query.limit) / query.limit;
        state.query = query;
    },
    addProductToPartialCotization(state, value)
    {
    let productoEnExistencia = state.cotizacionSinConfirmar.find(producto => producto.id === value.producto.id)

    if( productoEnExistencia && (productoEnExistencia.cantidad + value.cantidad > value.producto.stock))
    {
        state.stockError = true
    }
    if( productoEnExistencia && (productoEnExistencia.cantidad + value.cantidad <= value.producto.stock))
    {

        state.cotizacionSinConfirmar.find(producto => producto.id === value.producto.id).cantidad += value.cantidad
    }
    if (!productoEnExistencia) {
        const producto = {...value.producto, cantidad: value.cantidad}
        state.cotizacionSinConfirmar.push(producto)
    }

    },
    setLoading: set("loading"),
    resetState(state) {
        Object.assign(state, initialState());
    },
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations,
};
