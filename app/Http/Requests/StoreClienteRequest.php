<?php

namespace App\Http\Requests;

use App\Models\Cliente;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;

class StoreClienteRequest extends FormRequest
{
    public function authorize()
    {
        return true;//Gate::allows('cliente_create');
    }

    public function rules()
    {
        return [
            'nombre' => [
                'string',
                'required',
            ],
            'cuit' => [
                'string',
                'required',
            ],
        ];
    }
}
