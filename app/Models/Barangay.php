<?php

namespace App\Models;

use App\Traits\HasGraphQLScopes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Barangay extends Model
{
    use HasGraphQLScopes;

    protected array $searchable = [
        'id',
        'name',
        'resident.name',
    ];

    protected $fillable = [
        'id',
        'official_id',
    ];

    public function residents(): HasMany
    {
        return $this->hasMany(Resident::class);
    }

    public function households(): HasMany
    {
        return $this->hasMany(Household::class);
    }

    public function puroks(): HasMany
    {
        return $this->hasMany(Purok::class);
    }

    public function blotters(): HasMany
    {
        return $this->hasMany(Blotter::class);
    }

    public function official(): BelongsTo // this is for the captain
    {
        return $this->belongsTo(Official::class, 'official_id');
    }

    public function officials(): HasMany // the brgy officials
    {
        return $this->hasMany(Official::class);
    }
}
