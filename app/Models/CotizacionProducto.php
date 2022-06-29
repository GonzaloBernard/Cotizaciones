<?php

namespace App\Models;

use \DateTimeInterface;
use App\Support\HasAdvancedFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class CotizacionProducto extends Model
{
    use HasAdvancedFilter;
    use SoftDeletes;
    use HasFactory;

    public $table = 'cotizacion_producto';


    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $orderable = [
        'cotizacion_id',
        'producto_id',
        'cantidad',
        'monto_unitario',
    ];

    protected $filterable = [
        'cotizacion_id',
        'producto_id',
        'cantidad',
        'monto_unitario',
    ];

    protected $fillable = [
        'cotizacion_id',
        'producto_id',
        'cantidad',
        'monto_unitario',
        'created_at',
        'updated_at',
        'deleted_at',
    ];


/*     public function category()
    {
        return $this->belongsToMany(CotizacionProductoCategory::class);
    } */


    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
