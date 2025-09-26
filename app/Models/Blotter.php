<?php

namespace App\Models;

use App\Traits\HasGraphQLScopes;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Blotter extends Model
{
    use HasGraphQLScopes;

    protected array $searchable = [
        'id',
        'case_no',
        'complaint',
        'details',
        'barangay.name',
    ];

    // Relationships
    public function barangay(): BelongsTo
    {
        return $this->belongsTo(Barangay::class);
    }

    public function complainant(): BelongsTo
    {
        return $this->belongsTo(Resident::class);
    }

    public function respondent(): BelongsTo
    {
        return $this->belongsTo(Resident::class);
    }

    public function resolvedThisWeekCount($root, array $args): int
    {
        // Get start and end of the current week (Monday-Sunday)
        $startOfWeek = Carbon::now()->startOfWeek();
        $endOfWeek = Carbon::now()->endOfWeek();

        return Blotter::where('status', 'resolved')
            ->whereBetween('updated_at', [$startOfWeek, $endOfWeek])
            ->count();
    }
}
