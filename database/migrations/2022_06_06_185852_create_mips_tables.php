<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMipsTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Cliente
        Schema::create('cliente', function (Blueprint $table) {
           $table->id();
           $table->string('nombre');
           $table->string('cuit');
           $table->timestamps();
           $table->softDeletes();
        });
        // Cliente-Domicilio  -  Localidad
        Schema::create('localidad', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('cp');
            $table->timestamps();
            $table->softDeletes();
        });
        // Cliente - Domicilio
        Schema::create('domicilio', function (Blueprint $table) {
            $table->id();
            $table->string('calle');
            $table->string('numero')->nullable();
            $table->unsignedBigInteger('localidad_id')->nullable();
            $table->foreign('localidad_id', 'localidad_id_2112529')->references('id')->on('localidad');
            $table->unsignedBigInteger('cliente_id')->nullable();
            $table->foreign('cliente_id', 'cliente_id_2522489')->references('id')->on('cliente');
            $table->timestamps();
            $table->softDeletes();
        });

        // PRODUCTOS
        Schema::drop('product_product_category');

        Schema::create('product_category_section', function (Blueprint $table) {
            $table->id();
            $table->string('descripcion');
            $table->timestamps();
            $table->softDeletes();

        });
        Schema::table('product_categories', function (Blueprint $table) {
            $table->unsignedBigInteger('section_id')->nullable();
            $table->foreign('section_id', 'section_id_5551404')->references('id')->on('product_category_section');
        });
        Schema::table('products', function (Blueprint $table) {
            $table->string('img');
            $table->integer('stock');
            $table->unsignedBigInteger('categoria_id');
            $table->foreign('categoria_id', 'categoria_id_fk_4221404')->references('id')->on('product_categories');
        });
        Schema::create('cotizacion', function (Blueprint $table) {
            $table->id();
            $table->string('descripcion');
            $table->timestamps();
            $table->softDeletes();
        });

        // COTIZACION CLIENTE
        Schema::create('cotizacion_cliente', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cotizacion_id');
            $table->foreign('cotizacion_id', 'cotizacion_id_5661404')->references('id')->on('cotizacion');
            $table->unsignedBigInteger('cliente_id');
            $table->foreign('cliente_id', 'cliente_id_4221404')->references('id')->on('cliente');
            $table->timestamps();
            $table->softDeletes();
        });

        // COTIZACION PRODUCTO
        Schema::create('cotizacion_producto', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cotizacion_id');
            $table->foreign('cotizacion_id', 'cotizacion_id_4221404')->references('id')->on('cotizacion');
            $table->unsignedBigInteger('producto_id');
            $table->foreign('producto_id', 'producto_id_4221404')->references('id')->on('products');
            $table->integer('cantidad');
            $table->decimal('monto_unitario', 15, 2);
            $table->decimal('iva', 2, 2);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('movimiento_tipo', function (Blueprint $table) {
            $table->id();
            $table->string('descripcion');
            $table->timestamps();
        });

        // MOVIMIENTO DE STOCK
        Schema::create('movimiento', function (Blueprint $table) {
            $table->id();
            $table->string('descripcion');
            $table->unsignedBigInteger('tipo_id');
            $table->foreign('tipo_id', 'tipo_id_4331404')->references('id')->on('movimiento_tipo');
            $table->timestamps();
            $table->softDeletes();
        });

        // COTIZACION PRODUCTO
        Schema::create('movimiento_producto', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('movimiento_id');
            $table->foreign('movimiento_id', 'movimiento_id_6921404')->references('id')->on('movimiento');
            $table->unsignedBigInteger('producto_id');
            $table->foreign('producto_id', 'producto_id_5555404')->references('id')->on('products');
            $table->integer('cantidad');
            $table->timestamps();
            $table->softDeletes();
        });

    }
}
