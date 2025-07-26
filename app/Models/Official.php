<?php

namespace App\Models;

use App\Traits\HasGraphQLScopes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

class Official extends Model
{
    use HasGraphQLScopes;

    protected array $searchable = [
        'id',
        'position',
        'barangay.name',
        'resident.name',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::saved(function (Official $official) {
            if (
                strtolower($official->position) === 'barangay captain' &&
                $official->barangay_id
            ) {
                // If this captain's own term has already ended, don't make them the current one
                if ($official->term_end && Carbon::parse($official->term_end)->isPast()) {
                    return;
                }

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
