<?php

namespace App\GraphQL\Queries;

use App\Models\Attendance;

class AttendanceQuery
{
    public function byDate($_, array $args)
    {
        return Attendance::where('user_id', $args['user_id'])
            ->whereDate('date', $args['date'])
            ->first();
    }
}
