<?php

namespace App\Models;

use App\Traits\HasGraphQLScopes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Household extends Model
{
    use HasGraphQLScopes;

    protected array $searchable = ['id', 'address', 'household_no'];

    // Relationships
    public function residents(): HasMany
    {
        return $this->hasMany(Resident::class);
    }

    public function purok(): BelongsTo
    {
        return $this->belongsTo(Purok::class);
    }
}
