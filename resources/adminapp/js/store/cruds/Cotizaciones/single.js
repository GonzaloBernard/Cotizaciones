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
    postCotizacionCliente({ commit, state, dispatch }, value) {
        commit("setLoading", true);
        dispatch("Alert/resetState", null, { root: true });

        return new Promise((resolve, reject) => {
            let params = objectToFormData(
                //Hacer llegar id de clientes y cotizacion_id
                value,
                {indices: true,booleansAsIntegers: true}
            );
            axios
                .post(`${route}Cliente`, params)
                .then((response) => {
                    console.log(response)

                    dispatch(
                        "CotizacionesIndex/fetchIndexData",
                        null,
                        { root: true }
                    );



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
    async cotizacionPDF({ commit,rootGetters }, cotizacionObject) {
        console.log(cotizacionObject)
        commit("setLoading", true);
        const precioDolar = 1//parseFloat(rootGetters["ProductsIndex/getDolar"].venta)

        let sumaTotal = 0
        cotizacionObject.cotizacion.cotizacion_productos.forEach((item) => {
            sumaTotal += (item.cantidad * item.producto.price * (1+(item.producto.iva / 100 )) * precioDolar)
        })

        var props = {
            outputType: 'blob',
            returnJsPDFDocObject: true,
            fileName: "Invoice 2021",
            orientationLandscape: false,
            compress: true,
            logo: {
                src: "",
                type: 'PNG', //optional, when src= data:uri (nodejs case)
                width: 53.33, //aspect ratio = width/height
                height: 26.66,
                margin: {
                    top: 0, //negative or positive num, from the current position
                    left: 0 //negative or positive num, from the current position
                }
            },
            business: {
                name: "MIP",
                address: "",//"Av. Siempreviva 3222",
                phone: "(+54) 342 422 8588",
                email: "mipsantafe@gmail.com",
                website: "www.mipsantafe.com",
            },
            contact: {
                label: cotizacionObject.clienteIndex ? "Factura generada para:" : '',
                name: cotizacionObject.clienteIndex ? cotizacionObject.cotizacion.clientes[cotizacionObject.clienteIndex].nombre : '',
                address: cotizacionObject.clienteIndex ? `CUIT: ${cotizacionObject.cotizacion.clientes[cotizacionObject.clienteIndex].cuit}`: '',
            },
            invoice: {
                label: "Cotizacion #: ",
                num: cotizacionObject.cotizacion.id,
                invDate: "",//"Generada: 01/01/2021 18:12",
                invGenDate: "",//"Vencimiento: 02/02/2021 10:17",
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
                  { title: "IVA %"},
                  { title: "Cantidad"},
                  { title: "Subtotal"}
                ],
                table: Array.from(cotizacionObject.cotizacion.cotizacion_productos, (item, index)=>([
                    index + 1,
                    item.producto.name,
                    item.producto.description,
                    (item.producto.price * precioDolar).toFixed(2),
                    item.producto.iva,
                    item.cantidad,
                    (item.cantidad * item.producto.price * (1+(item.producto.iva / 100 )) * precioDolar ).toFixed(2)
                ])),
                additionalRows: [{
                    col1: 'Total:',
                    col2: sumaTotal.toFixed(2),
                    style: {
                        fontSize: 14 //optional, default 12
                    }
                },
/*                 {
                    col1: 'VAT:',
                    col2: '20',
                    col3: '%',
                    style: {
                        fontSize: 10 //optional, default 12
                    }
                }, */
                /* {
                    col1: 'SubTotal:',
                    col2: sumaTotal.toFixed(2),
                    style: {
                        fontSize: 10 //optional, default 12
                    }
                } */
            ],
                invDescLabel: "",//"Notas de la cotizacion",
                invDesc: "",//"Aca puede ir informacion relevante.",
            },
            footer: {
                text: "Esta cotización se creo en una computadora y es válida sin firma ni sello.",
            },
            pageEnable: true,
            pageLabel: "Página ",
        };
        const pdfObject = jsPDFInvoiceTemplate(props)
        pdfObject.jsPDFDocObject.save(`${Date.now()}-${cotizacionObject.cotizacion.id}`)
        try {
            const storageBucket = firebase
            .storage()
            .ref()
            .child(`mipUploads/cotizaciones/${Date.now()}-${cotizacionObject.cotizacion.id}.pdf`)
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
