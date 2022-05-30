import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const View = { template: '<router-view></router-view>' }

const routes = [
  {
    path: '/',
    component: () => import('@pages/Layout/DashboardLayout.vue'),
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@pages/Dashboard.vue'),
        meta: { title: 'global.dashboard' }
      },
      {
        path: 'user-management',
        name: 'user_management',
        component: View,
        redirect: { name: 'permissions.index' },
        children: [
          {
            path: 'permissions',
            name: 'permissions.index',
            component: () => import('@cruds/Permissions/Index.vue'),
            meta: { title: 'cruds.permission.title' }
          },
          {
            path: 'permissions/create',
            name: 'permissions.create',
            component: () => import('@cruds/Permissions/Create.vue'),
            meta: { title: 'cruds.permission.title' }
          },
          {
            path: 'permissions/:id',
            name: 'permissions.show',
            component: () => import('@cruds/Permissions/Show.vue'),
            meta: { title: 'cruds.permission.title' }
          },
          {
            path: 'permissions/:id/edit',
            name: 'permissions.edit',
            component: () => import('@cruds/Permissions/Edit.vue'),
            meta: { title: 'cruds.permission.title' }
          },
          {
            path: 'roles',
            name: 'roles.index',
            component: () => import('@cruds/Roles/Index.vue'),
            meta: { title: 'cruds.role.title' }
          },
          {
            path: 'roles/create',
            name: 'roles.create',
            component: () => import('@cruds/Roles/Create.vue'),
            meta: { title: 'cruds.role.title' }
          },
          {
            path: 'roles/:id',
            name: 'roles.show',
            component: () => import('@cruds/Roles/Show.vue'),
            meta: { title: 'cruds.role.title' }
          },
          {
            path: 'roles/:id/edit',
            name: 'roles.edit',
            component: () => import('@cruds/Roles/Edit.vue'),
            meta: { title: 'cruds.role.title' }
          },
          {
            path: 'users',
            name: 'users.index',
            component: () => import('@cruds/Users/Index.vue'),
            meta: { title: 'cruds.user.title' }
          },
          {
            path: 'users/create',
            name: 'users.create',
            component: () => import('@cruds/Users/Create.vue'),
            meta: { title: 'cruds.user.title' }
          },
          {
            path: 'users/:id',
            name: 'users.show',
            component: () => import('@cruds/Users/Show.vue'),
            meta: { title: 'cruds.user.title' }
          },
          {
            path: 'users/:id/edit',
            name: 'users.edit',
            component: () => import('@cruds/Users/Edit.vue'),
            meta: { title: 'cruds.user.title' }
          }
        ]
      },
      {
        path: 'product-management',
        name: 'product_management',
        component: View,
        redirect: { name: 'product_categories.index' },
        children: [
          {
            path: 'product-categories',
            name: 'product_categories.index',
            component: () => import('@cruds/ProductCategories/Index.vue'),
            meta: { title: 'cruds.productCategory.title' }
          },
          {
            path: 'product-categories/create',
            name: 'product_categories.create',
            component: () => import('@cruds/ProductCategories/Create.vue'),
            meta: { title: 'cruds.productCategory.title' }
          },
          {
            path: 'product-categories/:id',
            name: 'product_categories.show',
            component: () => import('@cruds/ProductCategories/Show.vue'),
            meta: { title: 'cruds.productCategory.title' }
          },
          {
            path: 'product-categories/:id/edit',
            name: 'product_categories.edit',
            component: () => import('@cruds/ProductCategories/Edit.vue'),
            meta: { title: 'cruds.productCategory.title' }
          },
          {
            path: 'product-tags',
            name: 'product_tags.index',
            component: () => import('@cruds/ProductTags/Index.vue'),
            meta: { title: 'cruds.productTag.title' }
          },
          {
            path: 'product-tags/create',
            name: 'product_tags.create',
            component: () => import('@cruds/ProductTags/Create.vue'),
            meta: { title: 'cruds.productTag.title' }
          },
          {
            path: 'product-tags/:id',
            name: 'product_tags.show',
            component: () => import('@cruds/ProductTags/Show.vue'),
            meta: { title: 'cruds.productTag.title' }
          },
          {
            path: 'product-tags/:id/edit',
            name: 'product_tags.edit',
            component: () => import('@cruds/ProductTags/Edit.vue'),
            meta: { title: 'cruds.productTag.title' }
          },
          {
            path: 'products',
            name: 'products.index',
            component: () => import('@cruds/Products/Index.vue'),
            meta: { title: 'cruds.product.title' }
          },
          {
            path: 'products/create',
            name: 'products.create',
            component: () => import('@cruds/Products/Create.vue'),
            meta: { title: 'cruds.product.title' }
          },
          {
            path: 'products/:id',
            name: 'products.show',
            component: () => import('@cruds/Products/Show.vue'),
            meta: { title: 'cruds.product.title' }
          },
          {
            path: 'products/:id/edit',
            name: 'products.edit',
            component: () => import('@cruds/Products/Edit.vue'),
            meta: { title: 'cruds.product.title' }
          }
        ]
      },
      {
        path: 'contact-management',
        name: 'contact_management',
        component: View,
        redirect: { name: 'contact_companies.index' },
        children: [
          {
            path: 'contact-companies',
            name: 'contact_companies.index',
            component: () => import('@cruds/ContactCompanies/Index.vue'),
            meta: { title: 'cruds.contactCompany.title' }
          },
          {
            path: 'contact-companies/create',
            name: 'contact_companies.create',
            component: () => import('@cruds/ContactCompanies/Create.vue'),
            meta: { title: 'cruds.contactCompany.title' }
          },
          {
            path: 'contact-companies/:id',
            name: 'contact_companies.show',
            component: () => import('@cruds/ContactCompanies/Show.vue'),
            meta: { title: 'cruds.contactCompany.title' }
          },
          {
            path: 'contact-companies/:id/edit',
            name: 'contact_companies.edit',
            component: () => import('@cruds/ContactCompanies/Edit.vue'),
            meta: { title: 'cruds.contactCompany.title' }
          },
          {
            path: 'contact-contacts',
            name: 'contact_contacts.index',
            component: () => import('@cruds/ContactContacts/Index.vue'),
            meta: { title: 'cruds.contactContact.title' }
          },
          {
            path: 'contact-contacts/create',
            name: 'contact_contacts.create',
            component: () => import('@cruds/ContactContacts/Create.vue'),
            meta: { title: 'cruds.contactContact.title' }
          },
          {
            path: 'contact-contacts/:id',
            name: 'contact_contacts.show',
            component: () => import('@cruds/ContactContacts/Show.vue'),
            meta: { title: 'cruds.contactContact.title' }
          },
          {
            path: 'contact-contacts/:id/edit',
            name: 'contact_contacts.edit',
            component: () => import('@cruds/ContactContacts/Edit.vue'),
            meta: { title: 'cruds.contactContact.title' }
          }
        ]
      },
      {
        path: 'expense-management',
        name: 'expense_management',
        component: View,
        redirect: { name: 'expense_categories.index' },
        children: [
          {
            path: 'expense-categories',
            name: 'expense_categories.index',
            component: () => import('@cruds/ExpenseCategories/Index.vue'),
            meta: { title: 'cruds.expenseCategory.title' }
          },
          {
            path: 'expense-categories/create',
            name: 'expense_categories.create',
            component: () => import('@cruds/ExpenseCategories/Create.vue'),
            meta: { title: 'cruds.expenseCategory.title' }
          },
          {
            path: 'expense-categories/:id',
            name: 'expense_categories.show',
            component: () => import('@cruds/ExpenseCategories/Show.vue'),
            meta: { title: 'cruds.expenseCategory.title' }
          },
          {
            path: 'expense-categories/:id/edit',
            name: 'expense_categories.edit',
            component: () => import('@cruds/ExpenseCategories/Edit.vue'),
            meta: { title: 'cruds.expenseCategory.title' }
          },
          {
            path: 'income-categories',
            name: 'income_categories.index',
            component: () => import('@cruds/IncomeCategories/Index.vue'),
            meta: { title: 'cruds.incomeCategory.title' }
          },
          {
            path: 'income-categories/create',
            name: 'income_categories.create',
            component: () => import('@cruds/IncomeCategories/Create.vue'),
            meta: { title: 'cruds.incomeCategory.title' }
          },
          {
            path: 'income-categories/:id',
            name: 'income_categories.show',
            component: () => import('@cruds/IncomeCategories/Show.vue'),
            meta: { title: 'cruds.incomeCategory.title' }
          },
          {
            path: 'income-categories/:id/edit',
            name: 'income_categories.edit',
            component: () => import('@cruds/IncomeCategories/Edit.vue'),
            meta: { title: 'cruds.incomeCategory.title' }
          },
          {
            path: 'expenses',
            name: 'expenses.index',
            component: () => import('@cruds/Expenses/Index.vue'),
            meta: { title: 'cruds.expense.title' }
          },
          {
            path: 'expenses/create',
            name: 'expenses.create',
            component: () => import('@cruds/Expenses/Create.vue'),
            meta: { title: 'cruds.expense.title' }
          },
          {
            path: 'expenses/:id',
            name: 'expenses.show',
            component: () => import('@cruds/Expenses/Show.vue'),
            meta: { title: 'cruds.expense.title' }
          },
          {
            path: 'expenses/:id/edit',
            name: 'expenses.edit',
            component: () => import('@cruds/Expenses/Edit.vue'),
            meta: { title: 'cruds.expense.title' }
          },
          {
            path: 'incomes',
            name: 'incomes.index',
            component: () => import('@cruds/Incomes/Index.vue'),
            meta: { title: 'cruds.income.title' }
          },
          {
            path: 'incomes/create',
            name: 'incomes.create',
            component: () => import('@cruds/Incomes/Create.vue'),
            meta: { title: 'cruds.income.title' }
          },
          {
            path: 'incomes/:id',
            name: 'incomes.show',
            component: () => import('@cruds/Incomes/Show.vue'),
            meta: { title: 'cruds.income.title' }
          },
          {
            path: 'incomes/:id/edit',
            name: 'incomes.edit',
            component: () => import('@cruds/Incomes/Edit.vue'),
            meta: { title: 'cruds.income.title' }
          },
          {
            path: 'expense-reports',
            name: 'expense_reports.index',
            component: () => import('@cruds/ExpenseReports/Index.vue'),
            meta: { title: 'cruds.expenseReport.title' }
          }
        ]
      }
    ]
  }
]

export default new VueRouter({
  mode: 'history',
  base: '/admin',
  routes
})
