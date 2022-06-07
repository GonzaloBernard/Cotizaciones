<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductSectionRequest;
use App\Http\Requests\UpdateProductSectionRequest;
use App\Http\Resources\Admin\ProductSectionResource;
use App\Models\ProductSection;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ProductSectionApiController extends Controller
{
    public function index()
    {
        //abort_if(Gate::denies('product_section_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new ProductSectionResource(ProductSection::get());
    }

    public function store(StoreProductSectionRequest $request)
    {
        $productSection = ProductSection::create($request->validated());

/*         if ($media = $request->input('photo', [])) {
            Media::whereIn('id', data_get($media, '*.id'))
                ->where('model_id', 0)
                ->update(['model_id' => $productSection->id]);
        } */

        return (new ProductSectionResource($productSection))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function create()
    {
        //abort_if(Gate::denies('product_section_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'meta' => [],
        ]);
    }

    public function show(ProductSection $productSection)
    {
        //abort_if(Gate::denies('product_section_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new ProductSectionResource($productSection);
    }

    public function update(UpdateProductSectionRequest $request, ProductSection $productSection)
    {
        $productSection->update($request->validated());

        $productSection->updateMedia($request->input('photo', []), 'product_section_photo');

        return (new ProductSectionResource($productSection))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function edit(ProductSection $productSection)
    {
        //abort_if(Gate::denies('product_section_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'data' => new ProductSectionResource($productSection),
            'meta' => [],
        ]);
    }

    public function destroy(ProductSection $productSection)
    {
        //abort_if(Gate::denies('product_section_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $productSection->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function storeMedia(Request $request)
    {
        //abort_if(Gate::none(['product_section_create', 'product_section_edit']), Response::HTTP_FORBIDDEN, '403 Forbidden');

        if ($request->has('size')) {
            $this->validate($request, [
                'file' => 'max:' . $request->input('size') * 1024,
            ]);
        }

        $model         = new ProductSection();
        $model->id     = $request->input('model_id', 0);
        $model->exists = true;
        $media         = $model->addMediaFromRequest('file')->toMediaCollection($request->input('collection_name'));

        return response()->json($media, Response::HTTP_CREATED);
    }
}
