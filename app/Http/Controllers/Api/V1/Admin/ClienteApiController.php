<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreClienteRequest;
use App\Http\Requests\UpdateClienteRequest;
use App\Http\Resources\Admin\ClienteResource;
use App\Models\Cliente;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ClienteApiController extends Controller
{
    public function index()
    {
        //abort_if(Gate::denies('cliente_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new ClienteResource(Cliente::advancedFilter());
    }

    public function store(StoreClienteRequest $request)
    {
        $request->validated();
        $cliente = Cliente::create([
            'nombre' => $request->company_name,
            'cuit' => $request->company_address,
        ]);

        return (new ClienteResource($cliente))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function create()
    {
        //abort_if(Gate::denies('cliente_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'meta' => [

            ],
        ]);
    }

    public function show(Cliente $cliente)
    {
        //abort_if(Gate::denies('cliente_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new ClienteResource($cliente);
    }

    public function update(UpdateClienteRequest $request, Cliente $cliente)
    {
        $cliente->update($request->validated());

        return (new ClienteResource($cliente))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function edit(Cliente $cliente)
    {
        //abort_if(Gate::denies('cliente_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'data' => new ClienteResource($cliente),
            'meta' => [

            ],
        ]);
    }

    public function destroy(Cliente $cliente)
    {
        //abort_if(Gate::denies('cliente_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $cliente->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
