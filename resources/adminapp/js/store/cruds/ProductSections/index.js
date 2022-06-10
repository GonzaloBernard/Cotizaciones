const set = (key) => (state, val) => {
    state[key] = val;
};

function initialState() {
    return {
        data: [],
        total: 0,
        query: {},
        loading: false
    }
}

const route = "product-sections";

const getters = {
    data: (state) => state.data,
    total: (state) => state.total,
    loading: (state) => state.loading,
    sidebarSectionLinks: (state) => state.data.map( (section) => {
        return {
            title: section.descripcion,
            icon: "table_view",
            path: { name: 'products.index', params: {sectionId: section.id}},
            name: 'products.index',
            component: () => import('@cruds/Products/Index.vue'),
            gate: "product_category_access"
        }
    })
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
