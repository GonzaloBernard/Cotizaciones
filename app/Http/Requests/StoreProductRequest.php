<?php

namespace App\Http\Requests;

use App\Models\Product;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;

class StoreProductRequest extends FormRequest
{
    public function authorize()
    {
        return true;//Gate::allows('product_create');
    }

    public function rules()
    {
        return [
            'name' => [
                'string',
                'required',
            ],
            'description' => [
                'string',
                'nullable',
            ],
            'price' => [
                'numeric',
                'required',
            ],
            'category' => [
                'array',
            ],
            'categoria_id' => [
                'integer',
                'required',
            ],
            'tag' => [
                'array',
            ],
            'tag.*.id' => [
                'integer',
                'exists:product_tags,id',
            ],
            'photo' => [
                'array',
                'nullable',
            ],
            'photo.*.id' => [
                'integer',
                'exists:media,id',
            ],
            'stock' => [
                'integer',
                'required',
            ],
        ];
    }
}
