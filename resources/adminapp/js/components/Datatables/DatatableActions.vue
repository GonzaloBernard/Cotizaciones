<template>
    <div class="dt-action-container">
        <router-link
            v-if="$can(xprops.permission_prefix + 'show')"
            :to="{ name: xprops.route + '.show', params: { id: row.id } }"
            class="ms-1"
        >
            <v-icon color="blue lighten-3" v-if="xprops.route === 'cotizacion'">
                mdi-eye
            </v-icon>
        </router-link>

        <router-link
            class="btn btn-just-icon btn-round btn-link text-success"
            v-if="
                xprops.route !== 'cotizacion' &&
                $can(xprops.permission_prefix + 'edit')
            "
            :to="{ name: xprops.route + '.edit', params: { id: row.id } }"
        >
            <i class="material-icons">edit</i>
        </router-link>

        <a href="#" class="ms-1" @click.prevent="agregarClienteCotizacion(row)">
            <v-icon color="blue darken-3" v-if="xprops.route === 'cotizacion'">
                mdi-account-plus
            </v-icon>
        </a>

        <!--     <a
      href="#"
      class="btn btn-just-icon btn-round btn-link text-rose"
      v-if="$can(xprops.permission_prefix + 'delete') && xprops.route !== 'cotizacion'"
      @click.prevent="destroyData(row.id)"
      type="button"
    >
      <i class="material-icons">delete</i>
    </a> -->
        <v-tooltip bottom color="orange darken-2">
            <template v-slot:activator="{ on, attrs }">
                <a
                    v-bind="attrs"
                    v-on="on"
                    href="#"
                    @click.prevent="descargarPDF(row)"
                    class="ms-1"
                >
                    <v-icon
                        color="orange darken-2"
                        v-if="xprops.route === 'cotizacion'"
                    >
                        mdi-file-account
                    </v-icon>
                </a>
            </template>
            <span>Generar cotizacion con cliente asociado</span>
        </v-tooltip>

        <v-tooltip top color="red darken-3">
            <template v-slot:activator="{ on, attrs }">
                <a
                    v-bind="attrs"
                    v-on="on"
                    href="#"
                    @click.prevent="descargarPDFSinCliente(row)"
                    class="ms-1"
                >
                    <v-icon
                        color="red darken-3"
                        v-if="xprops.route === 'cotizacion'"
                    >
                        mdi-file-document
                    </v-icon>
                </a>
            </template>
            <span>Generar cotizacion sin cliente</span>
        </v-tooltip>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    props: ["row", "xprops"],
    data() {
        return {
            // Code...
        };
    },
    created() {
        // Code...
        this.fetchIndexData();
    },
    computed: {
        ...mapGetters("ClientesIndex", ["data"]),
    },
    methods: {
        ...mapActions("ClientesIndex", ["fetchIndexData"]),

        agregarClienteCotizacion(row) {
            const Clientes = this.data.map((cliente) => {
                return `${cliente.id}- ${cliente.nombre}`;
            });
            this.$swal({
                title: "Agregar Clientes a la Cotización",
                text: "Seleccione un cliente",
                input: "select",
                inputOptions: {
                    Clientes,
                },
                showCancelButton: true,
                confirmButtonText: "Aceptar",
                confirmButtonColor: "green",
                focusCancel: true,
                reverseButtons: true,
            }).then((result) => {
                if (result.value) {
                    console.log(row.id);
                    this.$store
                        .dispatch("CotizacionesSingle/postCotizacionCliente", {
                            clientes: Clientes[parseInt(result.value)].split(
                                "-",
                                1
                            ),
                            cotizacion_id: row.id,
                        })
                        .then((result) => {
                            //this.$eventHub.$emit('delete-success')
                        });
                }
            });
        },
        descargarPDFSinCliente(cotizacion) {
            this.$store
                .dispatch("CotizacionesSingle/cotizacionPDF", {
                    cotizacion: cotizacion,
                    clienteIndex: null,
                })
                .then((result) => {
                    //this.$eventHub.$emit('delete-success')
                });
        },
        async descargarPDF(cotizacion) {
            const Clientes = cotizacion.clientes.map((cliente) => {
                return `${cliente.nombre}`;
            });
            this.$swal({
                title: "Generar Cotización",
                text: "Seleccione un cliente",
                input: "select",
                inputOptions: {
                    Clientes,
                },
                showCancelButton: true,
                confirmButtonText: "Descargar",
                confirmButtonColor: "green",
                focusCancel: true,
                reverseButtons: true,
            }).then((result) => {
                if (result.value) {
                    this.$store
                        .dispatch("CotizacionesSingle/cotizacionPDF", {
                            cotizacion: cotizacion,
                            clienteIndex: parseInt(result.value),
                        })
                        .then((result) => {
                            //this.$eventHub.$emit('delete-success')
                        });
                }
            });
        },
        destroyData(id) {
            this.$swal({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Delete",
                confirmButtonColor: "#dd4b39",
                focusCancel: true,
                reverseButtons: true,
            }).then((result) => {
                if (result.value) {
                    this.$store
                        .dispatch(this.xprops.module + "/destroyData", id)
                        .then((result) => {
                            this.$eventHub.$emit("delete-success");
                        });
                }
            });
        },
    },
};
</script>
