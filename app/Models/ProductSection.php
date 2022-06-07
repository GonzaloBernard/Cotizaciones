<?php

namespace App\Models;

use \DateTimeInterface;
use App\Support\HasAdvancedFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    use HasAdvancedFilter;


    use HasFactory;

    public $table = 'product_category_section';

    protected $dates = [
        'created_at',
        'updated_at',

    ];

    protected $fillable = [
        'name',
        'description',
        'created_at',
        'updated_at',

    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
