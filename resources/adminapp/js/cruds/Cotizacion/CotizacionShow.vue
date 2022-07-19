<template>
    <v-container class="mt-4">
        <v-card>
            <v-row justify="center">
                <h3>Cotización N° {{ entry.id }}</h3>
            </v-row>
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
                v-for="(row, index) in entry.cotizacion_productos"
                :key="index"
            >
                <v-row justify="space-between" class="mt-2">
                    <v-col cols="1" align-self="center" class="ml-6">
                        <v-list-item-avatar>
                            <v-img :src="row.producto.img"></v-img>
                        </v-list-item-avatar>
                    </v-col>
                    <v-col align-self="center">
                        {{ row.producto.name }}
                    </v-col>
                    <v-col align-self="center">
                        {{ row.producto.category.name }}
                    </v-col>
                    <v-col class="ml-4" align-self="center">
                        {{ row.producto.stock }}
                    </v-col>
                    <v-col align-self="center">
                        $ {{ row.producto.price }}
                    </v-col>
                    <v-col align-self="center">
                        {{ row.producto.iva }} %
                    </v-col>
                    <v-col class="ml-4" align-self="center">
                        {{ row.cantidad }}
                    </v-col>
                    <v-col align-self="center">
                        <v-chip color="green darken-3" dark label>
                            <v-icon left> mdi-currency-usd </v-icon>
                            {{
                                parseFloat(
                                    row.cantidad * row.monto_unitario
                                ).toFixed(2)
                            }}
                        </v-chip>
                    </v-col>
                </v-row>
            </v-card>
            <v-row justify="center" class="mt-8">
                <v-chip large color="green darken-3" dark label>
                    <b>Total: ${{ total }}</b>
                </v-chip>
            </v-row>
            <v-row justify="center" class="mt-2">
                <h3>Clientes</h3>
            </v-row>
            <v-row justify="center" class="mb-8">
                <v-chip-group>
                    <v-chip
                        dark
                        color="red darken-3"
                        v-for="cliente in entry.clientes"
                        :key="cliente.id"
                    >
                        {{ cliente.nombre }}
                    </v-chip>
                </v-chip-group>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    created() {
        this.fetchShowData(this.$route.params.id);
    },
    methods: {
        ...mapActions("CotizacionesSingle", ["fetchShowData", "resetData"]),
    },
    beforeDestroy () {
        this.resetData()
    },
    computed: {
        ...mapGetters("CotizacionesSingle", ["entry"]),

        total() {
            let total = 0;
            this.entry.cotizacion_productos?.forEach((item) => {
                total += parseFloat(item.monto_unitario) * item.cantidad * ( 1 + (parseFloat(item.producto.iva) / 100));
            });
            return total.toFixed(2);
        },
    },
};
</script>

<style></style>
