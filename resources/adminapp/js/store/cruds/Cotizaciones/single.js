import router from "../../../routes/routes";
import firebase from '@/helpers/firebase'
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";
function initialState() {
    return {
        ultimaCotizacion: null,
        entry: {
            id: null,
            descripcion: "",
            productos: [],
            created_at: "",
            updated_at: "",
            deleted_at: "",
        },
        loading: false,
    };
}

const route = "cotizacion";

const getters = {
    entry: (state) => state.entry,
    lists: (state) => state.lists,
    loading: (state) => state.loading,
    cotizacionActual: (state) => state.cotizacionActual,
};

const actions = {
    storeData({ commit, dispatch, rootGetters }, clientes) {
        commit("setLoading", true);
        dispatch("Alert/resetState", null, { root: true });

        return new Promise((resolve, reject) => {
            let params = {
                descripcion: "Descripcion generica",
                productos: rootGetters[
                    "CotizacionParcial/getCotizacionParcial"
                ].map((prod) => {
                    return { cantidad: prod.cantidad, id: prod.id };
                }),
                clientes,
            };
            axios
                .post(route, params)
                .then((response) => {
                    router.push({
                        name: "cotizacion.show",
                        params: { id: response.data.data.id },
                    });
                    resolve(response);
                })
                .catch((error) => {
                    let message = error.response.data.message || error.message;
                    let errors = error.response.data.errors;

                    dispatch(
                        "Alert/setAlert",
                        { message: message, errors: errors, color: "danger" },
                        { root: true }
                    );

                    reject(error);
                })
                .finally(() => {
                    commit("setLoading", false);
                });
        });
    },
    updateData({ commit, state, dispatch }) {
        commit("setLoading", true);
        dispatch("Alert/resetState", null, { root: true });

        return new Promise((resolve, reject) => {
            let params = objectToFormData(state.entry, {
                indices: true,
                booleansAsIntegers: true,
            });
            params.set("_method", "PUT");
            axios
                .post(`${route}/${state.entry.id}`, params)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    let message = error.response.data.message || error.message;
                    let errors = error.response.data.errors;

                    dispatch(
                        "Alert/setAlert",
                        { message: message, errors: errors, color: "danger" },
                        { root: true }
                    );

                    reject(error);
                })
                .finally(() => {
                    commit("setLoading", false);
                });
        });
    },
    setCreatedAt({ commit }, value) {
        commit("setCreatedAt", value);
    },
    setUpdatedAt({ commit }, value) {
        commit("setUpdatedAt", value);
    },
    setDeletedAt({ commit }, value) {
        commit("setDeletedAt", value);
    },
    fetchCreateData({ commit }) {
        axios.get(`${route}/create`).then((response) => {
            commit("setLists", response.data.meta);
        });
    },
    fetchEditData({ commit, dispatch }, id) {
        axios.get(`${route}/${id}/edit`).then((response) => {
            commit("setEntry", response.data.data);
            commit("setLists", response.data.meta);
        });
    },
    fetchShowData({ commit, dispatch }, id) {
        axios.get(`${route}/${id}`).then((response) => {
            commit("setEntry", response.data.data);
        });
    },
    resetState({ commit }) {
        commit("resetState");
    },
    async cotizacionPDF({ commit }, cotizacionObject) {
        commit("setLoading", true);
        var props = {
            outputType: 'blob',
            returnJsPDFDocObject: true,
            fileName: "Invoice 2021",
            orientationLandscape: false,
            compress: true,
            logo: {
                src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
                type: 'PNG', //optional, when src= data:uri (nodejs case)
                width: 53.33, //aspect ratio = width/height
                height: 26.66,
                margin: {
                    top: 0, //negative or positive num, from the current position
                    left: 0 //negative or positive num, from the current position
                }
            },
            stamp: {
                inAllPages: true, //by default = false, just in the last page
                src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
                type: 'JPG', //optional, when src= data:uri (nodejs case)
                width: 20, //aspect ratio = width/height
                height: 20,
                margin: {
                    top: 0, //negative or positive num, from the current position
                    left: 0 //negative or positive num, from the current position
                }
            },
            business: {
                name: "MIP",
                address: "Av. Siempreviva 3222",
                phone: "(+54)342 5 7895 355",
                email: "mip@example.com",
                website: "www.mip.com",
            },
            contact: {
                label: "Factura generada para:",
                name: cotizacionObject.cotizacion.clientes[cotizacionObject.clienteIndex].nombre,
                address: `CUIT: ${cotizacionObject.cotizacion.clientes[cotizacionObject.clienteIndex].cuit}`,
            },
            invoice: {
                label: "Cotizacion #: ",
                num: cotizacionObject.cotizacion.id,
                invDate: "Generada: 01/01/2021 18:12",
                invGenDate: "Vencimiento: 02/02/2021 10:17",
                headerBorder: false,
                tableBodyBorder: false,
                header: [
                  {
                    title: "#",
                    style: {
                      width: 10
                    }
                  },
                  {
                    title: "Titulo",
                    style: {
                      width: 30
                    }
                  },
                  {
                    title: "Descripcion",
                    style: {
                      width: 80
                    }
                  },
                  { title: "Precio"},
                  { title: "Cantidad"},
                  { title: "Medida"},
                  { title: "Total"}
                ],
                table: Array.from(cotizacionObject.cotizacion.cotizacion_productos, (item, index)=>([
                    index + 1,
                    item.producto.name,
                    item.producto.description,
                    item.producto.price,
                    item.cantidad,
                    "unidad",
                    parseFloat(item.cantidad * item.monto_unitario)
                ])),
                additionalRows: [{
                    col1: 'Total:',
                    col2: '145,250.50',
                    col3: 'ALL',
                    style: {
                        fontSize: 14 //optional, default 12
                    }
                },
                {
                    col1: 'VAT:',
                    col2: '20',
                    col3: '%',
                    style: {
                        fontSize: 10 //optional, default 12
                    }
                },
                {
                    col1: 'SubTotal:',
                    col2: '116,199.90',
                    col3: 'ALL',
                    style: {
                        fontSize: 10 //optional, default 12
                    }
                }],
                invDescLabel: "Invoice Note",
                invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
            },
            footer: {
                text: "The invoice is created on a computer and is valid without the signature and stamp.",
            },
            pageEnable: true,
            pageLabel: "Page ",
        };
        const pdfObject = jsPDFInvoiceTemplate(props)
        pdfObject.jsPDFDocObject.save(`${Date.now()}--${cotizacionObject.cotizacion.id}`)
        try {
            const storageBucket = firebase
            .storage()
            .ref()
            .child(`mipUploads/cotizaciones/${Date.now()}-${cotizacionObject.cotizacion.clientes[cotizacionObject.clienteIndex].nombre}-${cotizacionObject.cotizacion.id}.pdf`)
            const snapshot = await storageBucket.put(pdfObject.blob)
            const url = await snapshot.ref.getDownloadURL() // ver que hacer con esta url ?
            commit("setLoading", false);
          } catch (error) {
            console.log(error)
          }
    },
};

const mutations = {
    setCotizacionActual(state, cotizacion) {
        state.cotizacionActual = cotizacion;
    },
    setEntry(state, entry) {
        state.entry = entry;
    },
    setCreatedAt(state, value) {
        state.entry.created_at = value;
    },
    setUpdatedAt(state, value) {
        state.entry.updated_at = value;
    },
    setDeletedAt(state, value) {
        state.entry.deleted_at = value;
    },
    setLists(state, lists) {
        state.lists = lists;
    },
    setLoading(state, loading) {
        state.loading = loading;
    },
    resetState(state) {
        state = Object.assign(state, initialState());
    },
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations,
};
