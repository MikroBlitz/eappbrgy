<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Purok extends Model
{
    public function residents(): HasMany
    {
        return $this->hasMany(Resident::class);
    }

    public function households(): HasMany
    {
        return $this->hasMany(Household::class);
    }

    /* Search function for graphql */
    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        if (empty($search)) return $query;

        return $query->where('id', $search)
            ->orWhere('name', 'like', "%{$search}%");
    }

    /* Sort function for graphql */
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
