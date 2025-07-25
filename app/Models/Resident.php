<?php

namespace App\Models;

use App\Traits\HasGraphQLScopes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use Illuminate\Database\Eloquent\Model;

class Resident extends Model
{
    use HasGraphQLScopes;

    protected array $searchable = [
        'id',
        'name',
        'first_name',
        'middle_name',
        'last_name',
        'email',
    ];

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

    // Relationships
    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }

    public function barangay(): BelongsTo
    {
        return $this->belongsTo(Barangay::class);
    }

    public function household(): BelongsTo
    {
        return $this->belongsTo(Household::class);
    }

    public function purok(): BelongsTo
    {
        return $this->belongsTo(Purok::class);
    }

    public function blotters(): HasMany
    {
        return $this->hasMany(Blotter::class);
    }

    public function officials(): HasMany
    {
        return $this->hasMany(Official::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class);
    }
}
