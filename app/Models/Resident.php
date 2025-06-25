<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use Illuminate\Database\Eloquent\Model;

class Resident extends Model
{
    protected static function boot(): void
    {
        parent::boot();

        static::saving(function ($resident) {
            $resident->name = $resident->generateFullName();
        });
    }

    public function generateFullName(): string
    {
        $parts = [
            trim((string) $this->first_name),
            trim((string) $this->middle_name),
            trim((string) $this->last_name),
        ];

        return implode(' ', array_filter($parts));
    }

    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }

    public function household(): BelongsTo
    {
        return $this->belongsTo(Household::class);
    }

    public function purok(): BelongsTo
    {
        return $this->belongsTo(Purok::class);
    }

    /* Search function for graphql */
    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        if (empty($search)) return $query;

        return $query->where('id', $search)
            ->orWhere('first_name', 'like', "%{$search}%")
            ->orWhere('middle_name', 'like', "%{$search}%")
            ->orWhere('last_name', 'like', "%{$search}%")
            ->orWhere('email', 'like', "%{$search}%");
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
