<template>
    <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
        <event-hub></event-hub>
        <side-bar :sidebarLinks="sidebarLinks">
            <mobile-menu slot="content"></mobile-menu>
        </side-bar>

        <div class="main-panel">
            <v-app>
                <top-navbar></top-navbar>
                <div class="content mt-16">
                    <dashboard-content></dashboard-content>
                </div>
            </v-app>
        </div>
    </div>
</template>

<script>
import DashboardContent from "./Content.vue";
import TopNavbar from "./TopNavbar.vue";
import MobileMenu from "./MobileMenu.vue";
import { mapGetters } from "vuex";

export default {
    components: {
        DashboardContent,
        TopNavbar,
        MobileMenu,
    },
    computed: {
        ...mapGetters("ProductSectionsIndex", ["sidebarSectionLinks"]),
        sidebarLinks() {
            return [
                {
                    title: "global.dashboard",
                    icon: "dashboard",
                    path: { name: "dashboard" },
                },
                {
                    title: "cruds.userManagement.title",
                    icon: "person",
                    path: { name: "user_management" },
                    gate: "user_management_access",
                    children: [
                        {
                            title: "cruds.permission.title",
                            icon: "perm_data_setting",
                            path: { name: "permissions.index" },
                            gate: "permission_access",
                        },
                        {
                            title: "cruds.role.title",
                            icon: "group",
                            path: { name: "roles.index" },
                            gate: "role_access",
                        },
                        {
                            title: "cruds.user.title",
                            icon: "person",
                            path: { name: "users.index" },
                            gate: "user_access",
                        },
                    ],
                },
                {
                    title: "Parámetros",
                    icon: "table_view",
                    path: { name: "product_management" },
                    gate: "product_management_access",
                    children: [
                        {
                            title: "Secciones",
                            icon: "table_view",
                            path: { name: "product_sections.index" },
                            gate: "product_category_access",
                        },
                        {
                            title: "Categorias",
                            icon: "table_view",
                            path: { name: "product_categories.index" },
                            gate: "product_category_access",
                        },
                        /* {
                            title: "cruds.productTag.title",
                            icon: "table_view",
                            path: { name: "product_tags.index" },
                            gate: "product_tag_access",
                        }, */
                    ],
                },
                {
                    title: "Productos",
                    icon: "table_view",
                    path: { name: "products.index" },
                    gate: "product_category_access",
                    children: this.sidebarSectionLinks,
                },
                {
                    title: "Proveedores",
                    icon: "import_contacts",
                    path: { name: "contact_management" },
                    gate: "proveedores",
                    children: [
                        {
                            title: "Empresas",
                            icon: "fas fa-building",
                            path: { name: "contact_companies.index" },
                            gate: "contact_company_access",
                        },
                        {
                            title: "cruds.contactContact.title",
                            icon: "fas fa-user-plus",
                            path: { name: "contact_contacts.index" },
                            gate: "contact_contact_access",
                        },
                    ],
                },
                {
                    title: "Balances",
                    icon: "account_balance_wallet",
                    path: { name: "expense_management" },
                    gate: "balances",
                    children: [
                        {
                            title: "cruds.expenseCategory.title",
                            icon: "table_view",
                            path: { name: "expense_categories.index" },
                            gate: "expense_category_access",
                        },
                        {
                            title: "cruds.incomeCategory.title",
                            icon: "table_view",
                            path: { name: "income_categories.index" },
                            gate: "income_category_access",
                        },
                        {
                            title: "cruds.expense.title",
                            icon: "table_view",
                            path: { name: "expenses.index" },
                            gate: "expense_access",
                        },
                        {
                            title: "cruds.income.title",
                            icon: "table_view",
                            path: { name: "incomes.index" },
                            gate: "income_access",
                        },
                        {
                            title: "cruds.expenseReport.title",
                            icon: "table_view",
                            path: { name: "expense_reports.index" },
                            gate: "expense_report_access",
                        },
                    ],
                },
            ];
        },
    },

    data() {
        return {
            a: null,
        };
    },
};
</script>
