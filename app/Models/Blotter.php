<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Blotter extends Model
{
    // Relationships
    public function complainant(): BelongsTo
    {
        return $this->belongsTo(Resident::class);
    }

    public function respondent(): BelongsTo
    {
        return $this->belongsTo(Resident::class);
    }

    /* Search function for graphql */
    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        if (empty($search)) return $query;

        return $query->where('id', $search)
            ->orWhere('case_no', 'like', "%{$search}%")
            ->orWhere('details', 'like', "%{$search}%");
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

    /* Filter function for graphql */
    public function scopeFilter(Builder $query, ?array $filters): Builder
    {
        if (!$filters) {
            return $query;
        }

        $booleanFields = ['is_active', 'is_verified'];

        if (isset($filters['key']) && isset($filters['value'])) {
            $filters = [$filters];
        }

        foreach ($filters as $filter) {
            if (isset($filter['key']) && isset($filter['value'])) {
                $field = $filter['key'];
                $value = $filter['value'];

                if (in_array($field, $booleanFields)) {
                    if ($value === 'true') {
                        $query->where($field, '=', 1);
                    } else if ($value === 'false') {
                        $query->where($field, '=', 0);
                    }
                } else if ($value === 'null') {
                    $query->whereNull($field);
                } else {
                    $query->where($field, $value);
                }
            }
        }

        return $query;
    }
}
