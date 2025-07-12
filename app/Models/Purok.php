<?php

namespace App\Models;

use App\Traits\HasGraphQLScopes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Purok extends Model
{
    use HasGraphQLScopes;

    protected array $searchable = ['id', 'name'];

    public function residents(): HasMany
    {
        return $this->hasMany(Resident::class);
    }

    public function households(): HasMany
    {
        return $this->hasMany(Household::class);
    }
}
