<?php

namespace App\Http\Requests;

use App\Models\ProductCategory;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;

class StoreProductSectionRequest extends FormRequest
{
    public function authorize()
    {
        return true;//Gate::allows('product_category_create');
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
