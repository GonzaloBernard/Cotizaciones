function initialState() {
    return {
        cotizacionSinConfirmar: [],
        stockError: false
    }
}

const getters = {
    data: (state) => state.data,
    total: (state) => state.total,
    loading: (state) => state.loading,
    getCotizacionParcial: (state) => state.cotizacionSinConfirmar,
    getStockError: (state) => state.stockError
}

const actions = {
    addProductToPartialCotization({commit}, prod)
    {
        commit('addProductToPartialCotization', prod)
    },

    setCantidad({commit}, obj)
    {
        commit("setCantidad", obj)
    },

    resetState({ commit }) {
        commit("resetState");
    },
};

const mutations = {

    setCantidad(state, value)
    {
        state.cotizacionSinConfirmar.find(cot => cot.id === value.id).cantidad = value.cantidad
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
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations,
};
