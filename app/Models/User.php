<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens, softDeletes, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'first_name',
        'middle_name',
        'last_name',
        'phone',
        'email',
        'password',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected static function boot(): void
    {
        parent::boot();

        static::saving(function ($user) {
            $user->name = $user->generateFullName();
        });
    }

    /**
     * Compose the complete name of the user.
     *
     * @param \App\Modules\User\Models\User $user
     *
     * @return string
     */
    public function generateFullName(): string
    {
        $parts = [
            trim((string) $this->first_name),
            trim((string) $this->middle_name),
            trim((string) $this->last_name),
        ];

        return implode(' ', array_filter($parts));
    }

    /* Get all roles for user */
    public function roles(): MorphToMany
    {
        return $this->morphToMany(Role::class, 'model', 'model_has_roles');
    }

    /* Check if user is admin */
    public function is_admin(): bool
    {
        return $this->hasRole('Admin');
    }

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }

    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class);
    }

    public function resident(): BelongsTo
    {
        return $this->belongsTo(Resident::class);
    }

    /* Search function for graphql */
    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        if (empty($search)) return $query;

        return $query->where('id', $search)
            ->orWhere('name', 'like', "%{$search}%")
            ->orWhere('first_name', 'like', "%{$search}%")
            ->orWhere('middle_name', 'like', "%{$search}%")
            ->orWhere('last_name', 'like', "%{$search}%")
            ->orWhere('email', 'like', "%{$search}%");
    }

    /* Sort function for graphql */
    public function scopeSort(Builder $query, ?array $sort): Builder
    {
        if (empty($sort['column']) || empty($sort['direction'])) {
            return $query;
        }

        $column = $sort['column'];
        $direction = strtolower($sort['direction']) === 'desc' ? 'desc' : 'asc';

        return $query->orderBy($column, $direction);
    }

    /* Filter function for graphql */
    public function scopeFilter(Builder $query, ?array $filters): Builder
    {
        if (!$filters) {
            return $query;
        }

        $booleanFields = ['is_active', 'is_verified'];

        if (isset($filters['key']) && isset($filters['value'])) {
            $filters = [$filters];
        }

        foreach ($filters as $filter) {
            if (isset($filter['key']) && isset($filter['value'])) {
                $field = $filter['key'];
                $value = $filter['value'];

                if (in_array($field, $booleanFields)) {
                    if ($value === 'true') {
                        $query->where($field, '=', 1);
                    } else if ($value === 'false') {
                        $query->where($field, '=', 0);
                    }
                } else if ($value === 'null') {
                    $query->whereNull($field);
                } else {
                    $query->where($field, $value);
                }
            }
        }

        return $query;
    }

}
