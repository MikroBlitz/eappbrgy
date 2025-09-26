<?php

namespace App\Models;

use App\Traits\HasGraphQLScopes;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Permission\Models\Permission as SpatiePermission;

class Permission extends SpatiePermission
{
    // use SoftDeletes;
    use HasGraphQLScopes;

    protected array $searchable = ['id', 'name'];

    protected $fillable = [
        'name',
        'guard_name',
    ];
}
