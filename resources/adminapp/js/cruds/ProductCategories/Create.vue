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
                                <strong>{{ $t("Categoria") }}</strong>
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
                                                $t(
                                                    "cruds.productCategory.fields.name"
                                                )
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
                                    <!-- <div
                                        class="form-group bmd-form-group"
                                        :class="{
                                            'has-items': entry.description,
                                            'is-focused':
                                                activeField == 'description',
                                        }"
                                    >
                                        <label
                                            class="bmd-label-floating required"
                                            >{{
                                                $t(
                                                    "cruds.productCategory.fields.description"
                                                )
                                            }}</label
                                        >
                                        <textarea
                                            class="form-control"
                                            rows="5"
                                            :value="entry.description"
                                            @input="updateDescription"
                                            @focus="focusField('description')"
                                            @blur="clearFocus"
                                            required
                                        ></textarea>
                                    </div> -->
                                    <div class="form-group bmd-form-group">
                                        <label class="bmd-label-floating"
                                            >Sección</label
                                        >
                                        <v-select
                                            name="section"
                                            label="descripcion"
                                            :key="'section-field'"
                                            :value="entry.section_id"
                                            :options="data"
                                            :closeOnSelect="true"
                                            @input="updateSection"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <vue-button-spinner
                                class="btn-primary"
                                :status="status"
                                :isLoading="loading"
                                :disabled="loading"
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
import Attachment from "@components/Attachments/Attachment";

export default {
    components: {
        Attachment,
    },
    data() {
        return {
            status: "",
            activeField: "",
        };
    },
    computed: {
        ...mapGetters("ProductSectionsIndex", ["data"]),
        ...mapGetters("ProductCategoriesSingle", ["entry", "loading"]),
    },
    beforeDestroy() {
        this.resetState();
    },
    methods: {
        ...mapActions("ProductCategoriesSingle", [
            "storeData",
            "resetState",
            "setName",
            "setDescription",
            "insertPhotoFile",
            "removePhotoFile",
            "setSection",
        ]),
        updateName(e) {
            this.setName(e.target.value);
        },
        updateDescription(e) {
            this.setDescription(e.target.value);
        },

        updateSection(value) {
            this.setSection(value);
        },

        getRoute(name) {
            return `${axios.defaults.baseURL}${name}/media`;
        },
        submitForm() {
            this.storeData()
                .then(() => {
                    this.$router.push({ name: "product_categories.index" });
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
