<?php

namespace App\Models;

use App\Traits\HasGraphQLScopes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Official extends Model
{
    use HasGraphQLScopes;

    protected array $searchable = ['id', 'position'];

    protected static function boot()
    {
        parent::boot();

        static::saved(function (Official $official) {
            if (
                strtolower($official->position) === 'barangay captain' &&
                $official->barangay_id
            ) {
                // Always overwrite the barangay's captain
                Barangay::where('id', $official->barangay_id)
                    ->update(['official_id' => $official->id]);
            }
        });
    }

    public function resident(): BelongsTo
    {
        return $this->belongsTo(Resident::class);
    }

    public function barangay(): BelongsTo
    {
        return $this->belongsTo(Barangay::class);
    }
}
