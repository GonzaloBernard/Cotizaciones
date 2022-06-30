<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCotizacionRequest;
use App\Http\Requests\UpdateCotizacionRequest;
use App\Http\Resources\Admin\CotizacionResource;
use App\Models\Cotizacion;
use App\Models\CotizacionProducto;
use App\Models\Product;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CotizacionApiController extends Controller
{
    public function index()
    {
        //abort_if(Gate::denies('cotizacion_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new CotizacionResource(Cotizacion::with('cotizacionProductos','clientes')->advancedFilter());
    }

    public function store(StoreCotizacionRequest $request)
    {
        $cotizacion = Cotizacion::create($request->validated());

        foreach($request->productos as $producto){
            CotizacionProducto::create([
                'producto_id' => $producto['id'],
                'cantidad' => $producto['cantidad'],
                'monto_unitario' => Product::find($producto['id'])->price,
                'cotizacion_id' => $cotizacion->id,
            ]);
        }

        // Si hay clientes agregarlos
        if(!empty($request->clientes)){
            $cotizacion->clientes()->sync($request->clientes);
        }

        return (new CotizacionResource($cotizacion))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function create()
    {
        //abort_if(Gate::denies('cotizacion_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'meta' => [

            ],
        ]);
    }

    public function show(Cotizacion $cotizacion)
    {
        //abort_if(Gate::denies('cotizacion_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new CotizacionResource($cotizacion);
    }

    public function update(UpdateCotizacionRequest $request, Cotizacion $cotizacion)
    {
        $cotizacion->update($request->validated());

        return (new CotizacionResource($cotizacion))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function edit(Cotizacion $cotizacion)
    {
        //abort_if(Gate::denies('cotizacion_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'data' => new CotizacionResource($cotizacion),
            'meta' => [

            ],
        ]);
    }

    public function destroy(Cotizacion $cotizacion)
    {
        //abort_if(Gate::denies('cotizacion_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $cotizacion->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
