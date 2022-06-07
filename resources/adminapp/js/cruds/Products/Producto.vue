<template>
    <v-card

        :max-width="$vuetify.breakpoint.width > 970 ? 220 : 300"
        style="border-radius: 25px;"
    >
        <!-- Imagen del producto -->
        <v-carousel
            height="200"
            hide-delimiters
            hide-delimiter-background
            show-arrows-on-hover
        >
            <template v-slot:prev="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on"> mdi-chevron-left</v-icon>
            </template>
            <template v-slot:next="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on"> mdi-chevron-right</v-icon>
            </template>
            <v-carousel-item v-for="(item, i) in producto.images" :key="i">
                <v-img height="200" :src="item" contain></v-img>
            </v-carousel-item>
        </v-carousel>

        <!-- Titulo del producto -->
        <v-card-title>{{ producto.name }}</v-card-title>

        <v-card-text class="d-flex-column">
            <v-row justify="center">
                <v-col cols="auto" align-self="center">
                    <span
                        style="font-size: 0.55rem !important"
                        class="text-overline font-weight-medium"
                        >{{ precioDolar }} USD</span
                    >
                </v-col>
                <v-col cols="auto" align-self="center">
                    <span
                        style="font-size: 0.55rem !important"
                        class="text-overline font-weight-medium"
                        >{{ precioPesos }} ARS</span
                    >
                </v-col>
            </v-row>

            <div>{{ producto.description.substring(0,50) + '...' }}</div>
            <div class="my-4 text-subtitle-1">
                {{ producto.stock }} disponibles
            </div>
            <div>
                <v-slider
                    v-model="slider"
                    :max="producto.stock"
                    class="align-center mt-4"
                >
                    <template v-slot:append>
                        <v-text-field
                            v-model="slider"
                            class="text-center mt-0 pt-0"
                            type="number"
                            style="width: 40px"
                        ></v-text-field>
                    </template>
                </v-slider>
            </div>
            <div class="d-flex align-end my-auto mx-auto">
                <v-row justify="center">
                    <v-col align-self="stretch">
                        <v-btn color="#801515" dark x-small block>
                            Agregar al presupuesto
                        </v-btn>
                    </v-col>
                </v-row>

            </div>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            slider: 0,
        };
    },
    props: {
        producto: {
            required: true,
            type: Object,
        },
    },

    methods: {},

    computed: {
        ...mapGetters("ProductsIndex", ["getDolar"]),

        precioDolar() {
            return (
                this.producto.price / parseFloat(this.getDolar?.venta)
            ).toFixed(2);
        },

        precioPesos() {
            return (this.precioDolar * this.producto.price).toFixed(2);
        },
    },
};
</script>

<style></style>
