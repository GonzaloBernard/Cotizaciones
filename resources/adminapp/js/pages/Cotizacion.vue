<template>
    <v-container class="mt-4">
        <v-card>
            <v-row justify="center"> <h3>Nueva Cotizacion</h3> </v-row>
            <v-row justify="space-between" class="mt-4">
                <v-col
                    cols="1"
                    align-self="center"
                    class="ml-4 font-weight-bold"
                >
                    Imagen
                </v-col>
                <v-col align-self="center" class="font-weight-bold">
                    Nombre
                </v-col>
                <v-col align-self="center" class="font-weight-bold">
                    Categoría
                </v-col>
                <v-col align-self="center" class="font-weight-bold">
                    Stock
                </v-col>
                <v-col align-self="center" class="font-weight-bold">
                    Precio
                </v-col>
                <v-col align-self="center" class="font-weight-bold">
                    IVA
                </v-col>
                <v-col align-self="center" class="font-weight-bold">
                    Cantidad
                </v-col>
                <v-col align-self="center" class="font-weight-bold">
                    Subtotal
                </v-col>
            </v-row>
            <v-card
                v-for="(cotizacion, index) in getCotizacionParcial"
                :key="index"
            >
                <v-row justify="space-between" class="mt-2">
                    <v-col cols="1" align-self="center" class="ml-6">
                        <v-list-item-avatar>
                            <v-img :src="cotizacion.img"></v-img>
                        </v-list-item-avatar>
                    </v-col>
                    <v-col align-self="center">
                        {{ cotizacion.name }}
                    </v-col>
                    <v-col align-self="center">
                        {{ cotizacion.category.name }}
                    </v-col>
                    <v-col class="ml-4" align-self="center">
                        {{ cotizacion.stock }}
                    </v-col>
                    <v-col align-self="center">
                        $ {{ cotizacion.price }}
                    </v-col>
                    <v-col align-self="center"> {{ cotizacion.iva }} % </v-col>
                    <v-col class="ml-4" align-self="center">
                        {{ cotizacion.cantidad }}
                        <v-btn
                            @click="modalEditCantidad(cotizacion)"
                            class="mx-1"
                            fab
                            outlined
                            x-small
                            color="red darken-3"
                        >
                            <v-icon small dark> mdi-pencil </v-icon>
                        </v-btn>
                    </v-col>
                    <v-col align-self="center">
                        <v-chip color="green darken-3" dark label>
                            <v-icon left> mdi-currency-usd </v-icon>
                            {{
                                parseFloat(
                                    cotizacion.cantidad * cotizacion.price
                                ).toFixed(2)
                            }}
                        </v-chip>
                    </v-col>
                </v-row>
            </v-card>
        </v-card>

        <v-dialog v-model="editCantidad" width="500px">
            <v-card class="pa-8">
                <v-row justify="center">
                    <v-col cols="6" align-self="center">
                        <v-slider
                            v-model="cotizacionEditCantidad"
                            :max="cotizacionEdit ? cotizacionEdit.stock : 1000"
                            class="align-center"
                        >
                            <template v-slot:append>
                                <v-text-field
                                    v-model="cotizacionEditCantidad"
                                    class="text-center mt-0 pt-0"
                                    type="number"
                                    style="width: 40px"
                                ></v-text-field>
                            </template>
                        </v-slider>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col cols="6" align-self="center">
                        <v-btn
                            color="red darken-3"
                            dark
                            @click="actualizarCantidadEnCotizacion"
                        >
                            Guardar Cantidad
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
        <v-row justify="space-around" class="my-8">
            <v-col cols="6">
                <v-select
                    placeholder="Seleccione un cliente"
                    name="clientes"
                    label="nombre"
                    :multiple="true"
                    :key="'nombre'"
                    v-model="clientes"
                    :options="data"
                />
            </v-col>
            <v-col cols="3">
                <v-btn color="red darken-3" dark @click="save"><v-icon class="mr-1">mdi-check-decagram</v-icon> Guardar Cotizacion </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    data() {
        return {
            cotizacionEditCantidad: 0,
            cotizacionEdit: null,
            editCantidad: false,
            clientes: null,
        };
    },
    created() {
        this.fetchIndexData();
    },
    computed: {
        ...mapGetters("CotizacionParcial", ["getCotizacionParcial"]),
        ...mapGetters("ClientesIndex", ["data"]),
    },
    methods: {
        ...mapActions("ClientesIndex", ["fetchIndexData"]),
        ...mapActions("CotizacionParcial", [
            "setCantidad",
            "setClienteInCotizacion",
        ]),
        ...mapActions("CotizacionesSingle", ["storeData"]),
        modalEditCantidad(cot) {
            this.cotizacionEditCantidad = cot.cantidad;
            this.cotizacionEdit = cot;
            this.editCantidad = true;
        },

        save() {
            const c = this.clientes?.map((cliente) => {
                return cliente.id;
            });
            this.storeData(c);
        },
        actualizarCantidadEnCotizacion() {
            this.setCantidad({
                id: this.cotizacionEdit.id,
                cantidad: this.cotizacionEditCantidad,
            });
            this.editCantidad = false;
        },
    },
};
</script>

<style></style>
