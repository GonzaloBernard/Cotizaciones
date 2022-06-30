<?php

namespace App\Models;

use \DateTimeInterface;
use App\Support\HasAdvancedFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Cotizacion extends Model
{
    use HasAdvancedFilter;
    use SoftDeletes;
    use HasFactory;

    public $table = 'cotizacion';


    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $orderable = [
        'id',
        'descripcion',
    ];

    protected $filterable = [
        'id',
        'descripcion',
    ];

    protected $fillable = [
        'descripcion',
        'created_at',
        'updated_at',
        'deleted_at',
    ];


/*     public function category()
    {
        return $this->belongsToMany(CotizacionCategory::class);
    } */


    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    public function cotizacionProductos()
    {
        return $this->hasMany(CotizacionProducto::class);
    }

    public function clientes()
    {
        return $this->belongsToMany(Cliente::class, 'cotizacion_cliente');
    }
}
