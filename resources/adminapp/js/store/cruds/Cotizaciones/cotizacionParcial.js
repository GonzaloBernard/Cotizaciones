function initialState() {
    return {
        cotizacionSinConfirmar: [
            {
                id: 14,
                name: "Camara",
                description: "asdasdas",
                price: "11.00",
                created_at: "2022-06-21 22:49:01",
                updated_at: "2022-06-21 22:49:01",
                deleted_at: null,
                img: "https://firebasestorage.googleapis.com/v0/b/legalim.appspot.com/o/mipUploads%2Fimages%2F1655851732744-0.032822043297574766?alt=media&token=d5fe7a57-7199-4069-adbf-6e5d293e66ed",
                stock: 254,
                categoria_id: 3,
                iva: "21.00",
                photo: [],
                category: {
                    id: 3,
                    name: "Camaras",
                    description: "re piola",
                    created_at: "2022-06-08 18:53:55",
                    updated_at: "2022-06-08 18:53:55",
                    deleted_at: null,
                    section_id: 3,
                    photo: [],
                    media: [],
                },
                tag: [],
                media: [],
                cantidad: 84,
            },
            {
                id: 13,
                name: "asd",
                description: "asd",
                price: "6.00",
                created_at: "2022-06-21 22:48:22",
                updated_at: "2022-06-21 22:48:22",
                deleted_at: null,
                img: "https://firebasestorage.googleapis.com/v0/b/legalim.appspot.com/o/mipUploads%2Fimages%2F1655851658163-0.16227369968384653?alt=media&token=c93feffb-0844-4d22-a953-bb24dd78db19",
                stock: 100,
                categoria_id: 3,
                iva: "21.00",
                photo: [],
                category: {
                    id: 3,
                    name: "Camaras",
                    description: "re piola",
                    created_at: "2022-06-08 18:53:55",
                    updated_at: "2022-06-08 18:53:55",
                    deleted_at: null,
                    section_id: 3,
                    photo: [],
                    media: [],
                },
                tag: [],
                media: [],
                cantidad: 59,
            },
            {
                id: 8,
                name: "dfgdfgdfg",
                description: "dfgdfg",
                price: "34.00",
                created_at: "2022-06-21 22:14:04",
                updated_at: "2022-06-21 22:29:17",
                deleted_at: null,
                img: "https://firebasestorage.googleapis.com/v0/b/legalim.appspot.com/o/mipUploads%2Fimages%2F1655849637684-0.43250476422389394?alt=media&token=a742a970-3bb9-411b-bbe1-5c6580c777dc",
                stock: 100,
                categoria_id: 3,
                iva: "21.00",
                photo: [],
                category: {
                    id: 3,
                    name: "Camaras",
                    description: "re piola",
                    created_at: "2022-06-08 18:53:55",
                    updated_at: "2022-06-08 18:53:55",
                    deleted_at: null,
                    section_id: 3,
                    photo: [],
                    media: [],
                },
                tag: [],
                media: [],
                cantidad: 87,
            },
            {
                id: 6,
                name: "Camara 2k",
                description: "dsadasdas",
                price: "100.00",
                created_at: "2022-06-08 22:02:04",
                updated_at: "2022-06-21 22:43:17",
                deleted_at: null,
                img: "https://firebasestorage.googleapis.com/v0/b/legalim.appspot.com/o/mipUploads%2Fimages%2F1654725715842-0.01191173687866054?alt=media&token=4249cae5-c00d-40ce-a6ff-2b04685da48c",
                stock: 9,
                categoria_id: 3,
                iva: "21.00",
                photo: [],
                category: {
                    id: 3,
                    name: "Camaras",
                    description: "re piola",
                    created_at: "2022-06-08 18:53:55",
                    updated_at: "2022-06-08 18:53:55",
                    deleted_at: null,
                    section_id: 3,
                    photo: [],
                    media: [],
                },
                tag: [],
                media: [],
                cantidad: 1,
            },
        ],
        clientes: [],
        stockError: false,
    };
}

const getters = {
    data: (state) => state.data,
    total: (state) => state.total,
    getClientes: (state) => state.clientes,
    loading: (state) => state.loading,
    getCotizacionParcial: (state) => state.cotizacionSinConfirmar,
    getStockError: (state) => state.stockError,
};

const actions = {
    addProductToPartialCotization({ commit }, prod) {
        commit("addProductToPartialCotization", prod);
    },

    setCantidad({ commit }, obj) {
        commit("setCantidad", obj);
    },

    vaciarPresupuesto({ commit }) {
        commit("vaciarPresupuesto");
    },

    resetState({ commit }) {
        commit("resetState");
    },

    setClienteInCotizacion({commit}, id)
    {
        commit("setClienteInCotizacion", id)
    }
};

const mutations = {
    setCantidad(state, value) {
        state.cotizacionSinConfirmar.find(
            (cot) => cot.id === value.id
        ).cantidad = value.cantidad;
    },

    setClienteInCotizacion(state, value)
    {
        state.clientes.push(value)
    },

    vaciarPresupuesto(state) {
        state.cotizacionSinConfirmar = [];
    },

    addProductToPartialCotization(state, value) {
        state.stockError = null;
        let productoEnExistencia = state.cotizacionSinConfirmar.find(
            (producto) => producto.id === value.producto.id
        );

        if (
            productoEnExistencia &&
            productoEnExistencia.cantidad + value.cantidad >
                value.producto.stock
        ) {
            state.stockError = true;
        }
        if (
            productoEnExistencia &&
            productoEnExistencia.cantidad + value.cantidad <=
                value.producto.stock
        ) {
            state.cotizacionSinConfirmar.find(
                (producto) => producto.id === value.producto.id
            ).cantidad += value.cantidad;
        }
        if (!productoEnExistencia) {
            const producto = { ...value.producto, cantidad: value.cantidad };
            state.cotizacionSinConfirmar.push(producto);
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
