<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div
                        class="card-header card-header-success card-header-icon"
                    >
                        <div class="card-icon">
                            <i class="material-icons">assignment</i>
                        </div>
                        <div class="row justify-space-between">
                            <h4 class="card-title">
                                <strong>{{ $t("Productos") }}</strong>
                            </h4>
                            <router-link
                                class="btn btn-success"
                                v-if="$can(xprops.permission_prefix + 'create')"
                                :to="{ name: xprops.route + '.create' }"
                            >
                                <i class="material-icons"> add </i>
                                {{ $t("global.add") }}
                            </router-link>
                            <button
                                type="button"
                                class="btn btn-default"
                                @click="fetchIndexData"
                                :disabled="loading"
                                :class="{ disabled: loading }"
                            >
                                <i
                                    class="material-icons"
                                    :class="{ 'fa-spin': loading }"
                                >
                                    refresh
                                </i>
                                {{ $t("global.refresh") }}
                            </button>
                        </div>
                        <v-row class="mt-4">
                            <v-col cols="3">
                                <v-text-field
                                    @input="filtrar"
                                    solo
                                    v-model="busqueda"
                                    label="Búsqueda..."
                                    prepend-inner-icon="mdi-magnify"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="5">
                                <v-autocomplete
                                    v-model="categoriasFilter"
                                    :items="getCategories"
                                    item-text="name"
                                    item-value="id"
                                    solo
                                    chips
                                    small-chips
                                    label="Filtrar por Categoría"
                                    multiple
                                    @input="filtrar"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                    </div>

                    <div class="card-body">
                        <div class="row">
                            <div
                                class="col-md-12 containerProductos"
                                style="
                                    background-color: rgba(207, 199, 184, 0.15);
                                "
                            >
                                <!-- <div class="table-overlay" v-show="loading">
                  <div class="table-overlay-container">
                    <material-spinner></material-spinner>
                    <span>Loading...</span>
                  </div>
                </div>
                <datatable
                  :columns="columns"
                  :data="data"
                  :total="total"
                  :query="query"
                  :xprops="xprops"
                  :HeaderSettings="false"
                  :pageSizeOptions="[10, 25, 50, 100]"
                >
                  <global-search :query="query" class="pull-left" />
                  <header-settings :columns="columns" class="pull-right" />
                </datatable>
 -->

                                <Producto
                                    v-for="product in productosFiltrados"
                                    :key="product.id"
                                    :producto="product"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DatatableActions from "@components/Datatables/DatatableActions";
import TranslatedHeader from "@components/Datatables/TranslatedHeader";
import HeaderSettings from "@components/Datatables/HeaderSettings";
import GlobalSearch from "@components/Datatables/GlobalSearch";
import DatatableList from "@components/Datatables/DatatableList";
import DatatablePictures from "@components/Datatables/DatatablePictures";
import Producto from "@cruds/Products/Producto";

export default {
    components: {
        Producto,
        GlobalSearch,
        HeaderSettings,
    },
    data() {
        return {
            productosFiltrados: [],
            categoriasFilter: [],
            busqueda: "",
            items: ["Foo", "Bar", "Fizz", "Buzz"],
            columns: [
                {
                    title: "cruds.product.fields.id",
                    field: "id",
                    thComp: TranslatedHeader,
                    sortable: true,
                    colStyle: "width: 100px;",
                },
                {
                    title: "cruds.product.fields.name",
                    field: "name",
                    thComp: TranslatedHeader,
                    sortable: true,
                },
                {
                    title: "cruds.product.fields.description",
                    field: "description",
                    thComp: TranslatedHeader,
                    sortable: true,
                },
                {
                    title: "cruds.product.fields.price",
                    field: "price",
                    thComp: TranslatedHeader,
                    sortable: true,
                },
                {
                    title: "cruds.product.fields.category",
                    field: "category.name",
                    thComp: TranslatedHeader,
                    tdComp: DatatableList,
                },
                {
                    title: "cruds.product.fields.tag",
                    field: "tag.name",
                    thComp: TranslatedHeader,
                    tdComp: DatatableList,
                },
                {
                    title: "cruds.product.fields.photo",
                    field: "photo",
                    thComp: TranslatedHeader,
                    tdComp: DatatablePictures,
                },
                {
                    title: "global.actions",
                    thComp: TranslatedHeader,
                    tdComp: DatatableActions,
                    visible: true,
                    thClass: "text-right",
                    tdClass: "text-right td-actions",
                    colStyle: "width: 150px;",
                },
            ],
            query: { sort: "id", order: "desc", limit: 100, s: "" },
            xprops: {
                module: "ProductsIndex",
                route: "products",
                permission_prefix: "product_",
            },
        };
    },
    async created() {
        await this.fetchIndexData();

        if(this.$route.params.sectionId)
        {
        this.productosFiltrados = this.data.filter(prod => {
            return prod.category.section_id === parseInt(this.$route.params.sectionId)
        })
        }
        else  this.productosFiltrados = this.data;
    },

    /* beforeDestroy() {
    this.resetState()
  }, */
    computed: {
        ...mapGetters("ProductsIndex", ["data", "total", "loading"]),
        ...mapGetters("ProductCategoriesIndex", ["getCategories"]),
    },
    watch: {
        query: {
            handler(query) {
                this.setQuery(query);
                this.fetchIndexData();
            },
            deep: true,
        },
    },
    methods: {
        ...mapActions("ProductsIndex", [
            "fetchIndexData",
            "setQuery",
            "resetState",
        ]),

        filtrar(){
            console.log("|||")
            this.filterByCategoria();
            this.filterByName(this.busqueda);
        },
        filterByName(e) {
            if(e.length > 2)
            this.productosFiltrados = this.productosFiltrados.filter(
                (producto) =>
                    producto.name
                        .toLowerCase()
                        .includes(e.toLowerCase()) ||
                    producto.description
                        .toLowerCase()
                        .includes(e.toLowerCase())
            );
        },

        filterByCategoria() {
            let productosFiltradosPorCategorias = [];
            this.categoriasFilter?.forEach((categoria) => {
                Array.prototype.push.apply(
                    productosFiltradosPorCategorias,
                    this.data.filter((producto) => {
                        return producto.categoria_id === categoria;
                    })
                );
            });

            if (productosFiltradosPorCategorias.length > 0) {
                this.productosFiltrados = productosFiltradosPorCategorias;
            } else {
                this.productosFiltrados = this.data;
            }
        },
    },
};
</script>

<style scoped>
.containerProductos {
    padding: 30px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 15px;
    justify-content: center;
}

@media (max-width: 1400px) {
    .containerProductos {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
}

@media (max-width: 980px) {
    .containerProductos {
        grid-template-columns: 1fr 1fr 1fr;
    }
}

@media (max-width: 780px) {
    .containerProductos {
        grid-template-columns: 1fr 1fr;
    }
}
</style>
