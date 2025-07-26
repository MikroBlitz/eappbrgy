<?php

namespace App\Models;

use App\Traits\HasGraphQLScopes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Document extends Model
{
    use HasGraphQLScopes;

    protected array $searchable = [
        'id',
        'resident.name',
    ];

    protected $fillable = [
        'id',
        'resident_id',
        'created_by',
        'updated_by',
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

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

}
