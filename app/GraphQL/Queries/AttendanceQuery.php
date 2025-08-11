<?php

namespace App\GraphQL\Queries;

use App\Models\Attendance;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class AttendanceQuery
{
    public function byDate($_, array $args)
    {
        return Attendance::where('user_id', $args['user_id'])
            ->whereDate('date', $args['date'])
            ->first();
    }

    public function dailyTimeRecord($root, array $args): Collection
    {
        $start = Carbon::parse($args['start']);
        $end = Carbon::parse($args['end']);

        $query = Attendance::with('user')
            ->whereBetween('date', [$start, $end]);

        // Apply filters
        if (!empty($args['filter']) && is_array($args['filter'])) {
            foreach ($args['filter'] as $filter) {
                if (!isset($filter['key'], $filter['value'])) {
                    continue;
                }

                $field = $filter['key'];
                $value = $filter['value'];

                if (str_contains($field, '.')) {
                    // Handle relation field, e.g., "user.id"
                    [$relation, $relationField] = explode('.', $field, 2);

                    $query->whereHas($relation, function ($q) use ($relationField, $value) {
                        if (is_array($value)) {
                            $q->whereIn($relationField, $value);
                        } else {
                            $q->where($relationField, $value);
                        }
                    });
                } else {
                    // Normal field
                    if (is_array($value)) {
                        $query->whereIn($field, $value);
                    } else {
                        $query->where($field, $value);
                    }
                }
            }
        }

        return $query
            ->orderBy('date')
            ->get()
            ->groupBy('user_id')
            ->map(function ($records) {
                $normalHours = 0;
                $extraHours = 0;

                foreach ($records as $record) {
                    // Normal time slots
                    $normalSlots = [
                        [$record->am_time_in, $record->am_time_out],
                        [$record->pm_time_in, $record->pm_time_out],
                    ];

                    foreach ($normalSlots as [$in, $out]) {
                        if ($in && $out) {
                            $normalHours += Carbon::parse($in)->diffInMinutes(Carbon::parse($out)) / 60;
                        }
                    }

                    // Extra time slots (double pay)
                    $extraSlots = [
                        [$record->extra_time_in_1, $record->extra_time_out_1],
                        [$record->extra_time_in_2, $record->extra_time_out_2],
                    ];

                    foreach ($extraSlots as [$in, $out]) {
                        if ($in && $out) {
                            $extraHours += Carbon::parse($in)->diffInMinutes(Carbon::parse($out)) / 60;
                        }
                    }
                }

                $rate = $records->first()->user->hourly_rate ?? 0;

                // Normal salary + double pay for extra hours
                $salary = round(($normalHours * $rate) + ($extraHours * $rate * 2), 2);

                // Count unique working days
                $totalWorkingDays = $records->pluck('date')
                    ->map(fn($d) => Carbon::parse($d)->toDateString())
                    ->unique()
                    ->count();

                return [
                    'user' => $records->first()->user,
                    'total_hours' => round($normalHours + $extraHours, 2),
                    'normal_hours' => round($normalHours, 2),
                    'extra_hours' => round($extraHours, 2),
                    'salary' => $salary,
                    'total_working_days' => $totalWorkingDays,
                    'attendances' => $records->values(),
                ];
            })
            ->values();
    }
}
