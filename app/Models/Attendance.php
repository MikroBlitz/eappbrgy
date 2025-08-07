<?php

namespace App\Models;

use App\Traits\HasGraphQLScopes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attendance extends Model
{
    use HasGraphQLScopes;

    protected array $searchable = [
        'id',
        'date',
        'user.name',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
