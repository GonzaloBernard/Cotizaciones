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
use PDF;
use Carbon\Carbon;
use Storage;

class CotizacionApiController extends Controller
{
    public function index()
    {
        //abort_if(Gate::denies('cotizacion_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new CotizacionResource(Cotizacion::with('cotizacionProductos', 'cotizacionProductos.producto','clientes')->advancedFilter());
    }

    public function store(StoreCotizacionRequest $request)
    {
        $cotizacion = Cotizacion::create($request->validated());

        if(!empty($request->productos)){
        foreach($request->productos as $producto){
            CotizacionProducto::create([
                'producto_id' => $producto['id'],
                'cantidad' => $producto['cantidad'],
                'monto_unitario' => Product::find($producto['id'])->price,
                'cotizacion_id' => $cotizacion->id,
            ]);
        }
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

        return new CotizacionResource($cotizacion->load('cotizacionProductos', 'cotizacionProductos.producto', 'cotizacionProductos.producto.category','clientes'));
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

    public function postCotizacionPDF(Request $request){
        $cliente = $request->cliente;
        $cotizacion = Cotizacion::find($request->cotizacion);
        $data = [ 'cotizacion' => $cotizacion, 'cliente' => $request->cliente];
        return $this->generarPDF($data);
    }

    public function generarPDF($data){
        $pdf = PDF::loadView('layouts/cotizacionPDF', $data);

        $pdf_name = 'Cotizaciones/' .  str_replace(' ', '', $data['cliente']) . Carbon::now()->format('Ymdhis') .'.pdf' ;

        Storage::disk('public')->put($pdf_name, $pdf->output());
        return config('app.url').'/storage/' . $pdf_name;
    }
}
