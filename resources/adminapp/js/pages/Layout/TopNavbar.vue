<template>
    <nav
        class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top"
    >
        <div class="container-fluid">
            <div class="navbar-wrapper">
                <div class="navbar-brand" v-if="getDolar">
                    <v-chip dark color="green darken-3" class="mr-2">{{
                        `Dólar venta: $ ${getDolar.venta}`
                    }}</v-chip>

                    <v-chip dark color="green darken-3">{{
                        `Dólar compra: $ ${getDolar.compra}`
                    }}</v-chip>
                </div>
            </div>
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                aria-controls="navigation-index"
                aria-expanded="false"
                aria-label="Toggle navigation"
                @click="toggleSidebar"
                :class="{ toggled: $sidebar.showSidebar }"
            >
                <span class="sr-only">Toggle navigation</span>
                <span class="navbar-toggler-icon icon-bar"></span>
                <span class="navbar-toggler-icon icon-bar"></span>
                <span class="navbar-toggler-icon icon-bar"></span>
            </button>
            <!-- Collapsable -->
            <div class="collapse navbar-collapse justify-content-end">
                <ul class="navbar-nav">
                    <v-menu open-on-hover offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-badge
                                :content="getCotizacionParcial.length"
                                :value="getCotizacionParcial.length"
                                overlap
                                color="green"
                            >
                                <v-icon v-bind="attrs" v-on="on" large
                                    >mdi-cart</v-icon
                                >
                            </v-badge>
                        </template>


                        <v-list two-line>
                            <template v-for="producto in getCotizacionParcial">
                                <v-list-item :key="producto.id">
                                    <v-list-item-avatar class="mt-4">
                                        <v-img :src="producto.img"></v-img>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title
                                            v-html="producto.description"
                                        ></v-list-item-title>
                                        <v-list-item-subtitle
                                        ><span>Cantidad: {{producto.cantidad}}</span></v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-divider class="mx-4" :key="producto.id"></v-divider>
                            </template>


                            <v-row justify="center" class="ma-4">
                                <v-btn dark block x-small color="red darken-3"
                                    >Ir al Presupuesto</v-btn
                                >

                                <v-btn
                                    class="mt-2"
                                    dark
                                    block
                                    x-small
                                    color="red lighten-3"
                                    >Vaciar Presupuesto</v-btn
                                >
                            </v-row>
                        </v-list>
                    </v-menu>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            productos: 4,
        };
    },
    methods: {
        toggleSidebar() {
            this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
        },
    },
    computed: {
        ...mapGetters("ProductsIndex", ["getDolar"]),
        ...mapGetters("Cotizaciones", ["getCotizacionParcial"]),
    },
};
</script>
