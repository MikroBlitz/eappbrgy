<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Builder;
use Spatie\Permission\Models\Permission as SpatiePermission;
use Illuminate\Database\Eloquent\SoftDeletes;

class Permission extends SpatiePermission
{
    // use SoftDeletes;

    protected $fillable = [
        'name',
        'guard_name',
    ];

    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        if (empty($search)) return $query;

        return $query->where('name', 'like', "%{$search}%");
    }

    public function scopeSort(Builder $query, ?array $sort): Builder
    {
        if (empty($sort['column']) || empty($sort['direction'])) {
            return $query;
        }

        $column = $sort['column'];
        $direction = strtolower($sort['direction']) === 'desc' ? 'desc' : 'asc';

        return $query->orderBy($column, $direction);
    }

}
