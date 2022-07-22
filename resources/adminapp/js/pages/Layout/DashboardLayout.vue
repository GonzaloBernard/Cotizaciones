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
                    title: "Clientes",
                    icon: "import_contacts",
                    path: { name: "contact_companies.index" },
                    gate: "admin",
                },
                {
                    title: "Cotizaciones",
                    icon: "attach_money",
                    path: { name: "cotizaciones" },
                },
/*
                {
                    title: "global.dashboard",
                    icon: "dashboard",
                    path: { name: "dashboard" },
                    gate: "admin",
                }, */
                {
                    title: "Crear Secciones",
                    icon: "table_view",
                    path: { name: "product_sections.index" },
                    gate: "admin",
                },
                {
                    title: "Crear Categorias",
                    icon: "table_view",
                    path: { name: "product_categories.index" },
                    gate: "admin",
                },
                {
                    title: "Usuarios",
                    icon: "person",
                    path: { name: "users.index" },
                    gate: "user_access",
                },
                ...this.sidebarSectionLinks,

/*                 {
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
                }, */
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
