<template>
    <div class="container-fluid">
        <form @submit.prevent="submitForm">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div
                            class="card-header card-header-primary card-header-icon"
                        >
                            <div class="card-icon">
                                <i class="material-icons">add</i>
                            </div>
                            <h4 class="card-title">
                                {{ $t("global.create") }}
                                <strong>{{ $t("Producto") }}</strong>
                            </h4>
                        </div>
                        <div class="card-body">
                            <back-button></back-button>
                        </div>
                        <div class="card-body">
                            <bootstrap-alert />
                            <div class="row">
                                <div class="col-md-12">
                                    <div
                                        class="form-group bmd-form-group"
                                        :class="{
                                            'has-items': entry.name,
                                            'is-focused': activeField == 'name',
                                        }"
                                    >
                                        <label
                                            class="bmd-label-floating required"
                                            >{{
                                                $t("cruds.product.fields.name")
                                            }}</label
                                        >
                                        <input
                                            class="form-control"
                                            type="text"
                                            :value="entry.name"
                                            @input="updateName"
                                            @focus="focusField('name')"
                                            @blur="clearFocus"
                                            required
                                        />
                                    </div>
                                    <div
                                        class="form-group bmd-form-group"
                                        :class="{
                                            'has-items': entry.description,
                                            'is-focused':
                                                activeField == 'description',
                                        }"
                                    >
                                        <label class="bmd-label-floating">{{
                                            $t(
                                                "cruds.product.fields.description"
                                            )
                                        }}</label>
                                        <textarea
                                            class="form-control"
                                            rows="5"
                                            :value="entry.description"
                                            @input="updateDescription"
                                            @focus="focusField('description')"
                                            @blur="clearFocus"
                                        ></textarea>
                                    </div>
                                                                        <div class="form-group">
                                        <label>{{
                                            $t("cruds.product.fields.photo")
                                        }}</label>
                                        <UploadImages
                                            class="mb-8"
                                            @changed="subirImagen"
                                            maxError="1 Imágen máximo"
                                            clearAll="Limpiar imágenes"
                                            :max="1"
                                            uploadMsg="Click aquí o arrastre una imágen"
                                        />
                                    </div>
                                    <div
                                        class="form-group bmd-form-group"
                                        :class="{
                                            'has-items': entry.price,
                                            'is-focused':
                                                activeField == 'price',
                                        }"
                                    >
                                        <label
                                            class="bmd-label-floating required"
                                            >{{
                                                $t("cruds.product.fields.price")
                                            }}</label
                                        >
                                        <input
                                            class="form-control"
                                            type="number"
                                            step="0.01"
                                            :value="entry.price"
                                            @input="updatePrice"
                                            @focus="focusField('price')"
                                            @blur="clearFocus"
                                            required
                                        />
                                    </div>
                                    <div
                                        class="form-group bmd-form-group"
                                        :class="{
                                            'has-items':
                                                entry.category.length !== 0,
                                            'is-focused':
                                                activeField == 'category',
                                        }"
                                    >
                                        <label class="bmd-label-floating">{{
                                            $t("cruds.product.fields.category")
                                        }}</label>
                                        <v-select
                                            name="category"
                                            label="name"
                                            :key="'category-field'"
                                            :value="entry.category"
                                            :options="lists.category"
                                            :closeOnSelect="false"
                                            multiple
                                            @input="updateCategory"
        
                                        />
                                    </div>
                                    <div
                                        class="form-group bmd-form-group"
                                        :class="{
                                            'has-items': entry.tag.length !== 0,
                                            'is-focused': activeField == 'tag',
                                        }"
                                    >
                                        <label class="bmd-label-floating">{{
                                            $t("cruds.product.fields.tag")
                                        }}</label>
                                        <v-select
                                            name="tag"
                                            label="name"
                                            :key="'tag-field'"
                                            :value="entry.tag"
                                            :options="lists.tag"
                                            :closeOnSelect="false"
                                            multiple
                                            @input="updateTag"
    
                                        />
                                    </div>
                                        <label class="bmd-label-floating mt-4">
                                            Stock Inicial
                                        </label>
                                    <div
                                        class="form-group bmd-form-group"
                                    >
                                            <v-slider
                                                :value="entry.stock"
                                                :max="9999"
                                                class="align-center"
                                                @input="updateStock"
                                            >
                                                <template v-slot:append>
                                                    <v-text-field
                                                        :value="entry.stock"
                                                         @input="updateStock"
                                                        class="text-center mt-0 pt-0"
                                                        type="number"
                                                        style="width: 120px"
                                                    ></v-text-field>
                                                </template>
                                            </v-slider>
                                       
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <vue-button-spinner
                                class="btn-primary"
                                :status="status"
                                :isLoading="loading"
                                :disabled="!imagen"
                            >
                                {{ $t("global.save") }}
                            </vue-button-spinner>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UploadImages from "vue-upload-drop-images";

export default {
    components: {
        UploadImages,
    },
    data() {
        return {
            status: "",
            activeField: "",
            imagen: null,
        };
    },
    computed: {
        ...mapGetters("ProductsSingle", ["entry", "loading", "lists"]),
    },
    mounted() {
        this.fetchCreateData();
    },
    beforeDestroy() {
        this.resetState();
    },
    methods: {
        ...mapActions("ProductsSingle", [
            "storeData",
            "resetState",
            "setName",
            "setDescription",
            "setPrice",
            "setCategory",
            "setTag",
            "insertPhotoFile",
            "removePhotoFile",
            "fetchCreateData",
            "uploadImagen",
            "setStock"
        ]),

        async subirImagen(e) {
            const file = e[0];
            const uploadedImage = await this.uploadImagen({ file });

            this.imagen = uploadedImage;
        },

        updateName(e) {
            this.setName(e.target.value);
        },
        updateDescription(e) {
            this.setDescription(e.target.value);
        },
        updatePrice(e) {
            this.setPrice(e.target.value);
        },
        updateCategory(value) {
            this.setCategory(value);
        },
        updateTag(value) {
            this.setTag(value);
        },
        updateStock(value) {
            this.setStock(value);
        },
        getRoute(name) {
            return `${axios.defaults.baseURL}${name}/media`;
        },
        submitForm() {
            this.storeData()
                .then(() => {
                    this.$router.push({ name: "products.index" });
                    this.$eventHub.$emit("create-success");
                })
                .catch((error) => {
                    this.status = "failed";
                    _.delay(() => {
                        this.status = "";
                    }, 3000);
                });
        },
        focusField(name) {
            this.activeField = name;
        },
        clearFocus() {
            this.activeField = "";
        },
    },
};
</script>
