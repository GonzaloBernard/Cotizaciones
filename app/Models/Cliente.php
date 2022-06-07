<?php

namespace App\Models;

use \DateTimeInterface;
use App\Support\HasAdvancedFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Cliente extends Model
{
    use HasAdvancedFilter;
    use SoftDeletes;
    use HasFactory;

    public $table = 'cliente';


    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $orderable = [
        'id',
        'nombre',
        'cuit',
    ];

    protected $filterable = [
        'id',
        'nombre',
        'cuit',
    ];

    protected $fillable = [
        'nombre',
        'cuit',
        'created_at',
        'updated_at',
        'deleted_at',
    ];


/*     public function category()
    {
        return $this->belongsToMany(ClienteCategory::class);
    } */


    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
