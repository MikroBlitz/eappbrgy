<?php

namespace App\GraphQL\Resolvers;

use App\Models\Blotter;
use Carbon\Carbon;

class BlotterResolver
{
    /**
     * Return the count of blotters resolved this week.
     */
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
