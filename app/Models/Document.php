<?php

namespace App\Models;

use App\Traits\HasGraphQLScopes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Document extends Model
{
    use HasGraphQLScopes;

    protected array $searchable = ['id'];

    protected $fillable = [
        'id',
        'resident_id',
        'type',
        'category',
        'requested_at',
        'issued_at',
        'valid_until',
        'status'
    ];

    public function resident(): BelongsTo
    {
        return $this->belongsTo(Resident::class);
    }
}
