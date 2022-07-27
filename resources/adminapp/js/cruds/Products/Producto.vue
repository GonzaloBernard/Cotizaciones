<template>
    <div>
        <v-card
            :max-width="$vuetify.breakpoint.width > 970 ? 220 : 300"
            style="border-radius: 25px"
        >
            <!-- Imagen del producto -->

            <v-hover absolute>
                <template v-slot:default="{ hover }">
                    <div>
                        <v-fade-transition>
                            <v-overlay v-if="hover" absolute color="#fafafa">
                                <v-btn
                                    small
                                    color="red darken-3"
                                    @click="verProducto = true"
                                    >Ver Producto</v-btn
                                >
                            </v-overlay>
                        </v-fade-transition>
                        <v-img
                            height="180"
                            :src="producto.img ? producto.img : ''"
                            contain
                        ></v-img>
                    </div>
                </template>
            </v-hover>

            <!-- Titulo del producto -->
            <v-card-title>{{ producto.name }}</v-card-title>

            <v-card-text class="d-flex-column">
                <v-row justify="center">
                    <v-col cols="auto" align-self="center">
                        <span
                            style="font-size: 0.65rem !important"
                            class="text-overline font-weight-medium"
                            >{{ precioDolar }} USD</span
                        >
                    </v-col>
                    <v-col cols="auto" align-self="center">
                        <span
                            style="font-size: 0.65rem !important"
                            class="text-overline font-weight-medium"
                            >{{ precioPesos }} ARS</span
                        >
                    </v-col>
                </v-row>

                <v-row justify="center">
                    {{ producto.description.substring(0, 50) + "..." }}
                    <div class="my-4 text-subtitle-1">
                        <strong>{{ producto.stock }} disponibles</strong>
                    </div>
                    <v-col cols="12">
                        <v-slider
                            v-model="slider"
                            :max="producto.stock"
                            class="align-center"
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
                    </v-col>
                </v-row>
                <v-row>
                    <div class="d-flex align-end my-auto mx-auto">
                        <v-row justify="center" class="mb-2 mr-1">
                            <v-col
                                v-if="$can('product_access')"
                                cols="2"
                                class="mr-3"
                            >
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            v-bind="attrs"
                                            v-on="on"
                                            color="#801515"
                                            dark
                                            x-small
                                            @click="
                                                $emit('agregarProducto', {
                                                    producto: producto,
                                                    cantidad:
                                                        slider > 0 ? slider : 0,
                                                })
                                            "
                                        >
                                            <v-icon small>mdi-cart</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Agregar al Carrito</span>
                                </v-tooltip>
                            </v-col>
                            <v-col
                                v-if="$can('user_access')"
                                cols="2"
                                class="mr-3"
                            >
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            v-bind="attrs"
                                            v-on="on"
                                            color="#801515"
                                            dark
                                            x-small
                                            @click="
                                                $router.push({
                                                    name: 'products.edit',
                                                    params: { id: producto.id },
                                                })
                                            "
                                        >
                                            <v-icon small>mdi-pencil</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Editar Producto</span>
                                </v-tooltip>
                            </v-col>
                            <v-col
                                v-if="$can('user_access')"
                                cols="2"
                                class="mr-3"
                            >
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            v-bind="attrs"
                                            v-on="on"
                                            color="#801515"
                                            dark
                                            x-small
                                            @click="
                                                $emit(
                                                    'deletedProduct',
                                                    producto.id
                                                )
                                            "
                                        >
                                            <v-icon small>mdi-delete</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Borrar Producto</span>
                                </v-tooltip>
                            </v-col>
                        </v-row>
                    </div>
                </v-row>
            </v-card-text>
        </v-card>

        <v-dialog v-model="verProducto" width="500">
            <v-card> ¿Descripcion Larga? </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    data() {
        return {
            slider: 0,
            verProducto: false,
        };
    },
    props: {
        producto: {
            required: true,
            type: Object,
        },
    },

    computed: {
        ...mapGetters("ProductsIndex", ["getDolar"]),

        precioPesos() {
            return (
                this.producto.price * parseFloat(this.getDolar?.venta)
            ).toFixed(2);
        },

        precioDolar() {
            return this.producto.price;
        },
    },
};
</script>

<style></style>
