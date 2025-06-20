<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(
            \App\Models\User::class,
            'model_has_roles',  // default table for spatie/laravel-permission
            'role_id',
            'model_id'
        );
    }

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
