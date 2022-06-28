<?php

namespace App\Http\Requests;

use App\Models\Cotizacion;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;

class StoreCotizacionRequest extends FormRequest
{
    public function authorize()
    {
        return true;//Gate::allows('cotizacion_create');
    }

    public function rules()
    {
        return [
            'descripcion' => [
                'string',
                'nullable',
            ],
        ];
    }
}
