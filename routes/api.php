<?php

Route::group(['prefix' => 'v1', 'as' => 'api.', 'namespace' => 'Api\V1\Admin', 'middleware' => ['auth:sanctum']], function () {
    // Abilities
    Route::apiResource('abilities', 'AbilitiesController', ['only' => ['index']]);

    // Locales
    Route::get('locales/languages', 'LocalesController@languages')->name('locales.languages');
    Route::get('locales/messages', 'LocalesController@messages')->name('locales.messages');

    // Permissions
    Route::resource('permissions', 'PermissionsApiController');

    // Roles
    Route::resource('roles', 'RolesApiController');

    // Users
    Route::resource('users', 'UsersApiController');

    // Product Category
    Route::post('product-categories/media', 'ProductCategoryApiController@storeMedia')->name('product-categories.storeMedia');
    Route::resource('product-categories', 'ProductCategoryApiController');

    // Product Tag
    Route::resource('product-tags', 'ProductTagApiController');

    // Product
    Route::post('products/media', 'ProductApiController@storeMedia')->name('products.storeMedia');
    Route::resource('products', 'ProductApiController');

    // Contact Company
    Route::resource('contact-companies', 'ContactCompanyApiController');

    // Contact Contacts
    Route::resource('contact-contacts', 'ContactContactsApiController');

    // Expense Category
    Route::resource('expense-categories', 'ExpenseCategoryApiController');

    // Income Category
    Route::resource('income-categories', 'IncomeCategoryApiController');

    // Expense
    Route::resource('expenses', 'ExpenseApiController');

    // Income
    Route::resource('incomes', 'IncomeApiController');

    // Expense Report
    Route::apiResource('expense-reports', 'ExpenseReportApiController', ['only' => ['index']]);
});
