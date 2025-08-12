<?php

namespace App\GraphQL\Queries;

use App\Models\Attendance;
use Carbon\Carbon;
use Illuminate\Pagination\LengthAwarePaginator;

class AttendanceQuery
{
    public function byDate($_, array $args)
    {
        return Attendance::where('user_id', $args['user_id'])
            ->whereDate('date', $args['date'])
            ->first();
    }

    public function dailyTimeRecord($root, array $args): array
    {
        $start = Carbon::parse($args['start']);
        $end = Carbon::parse($args['end']);

        $query = Attendance::with('user')
            ->whereBetween('date', [$start, $end]);

        // Filters
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
                        is_array($value)
                            ? $q->whereIn($relationField, $value)
                            : $q->where($relationField, $value);
                    });
                } else {
                    is_array($value)
                        ? $query->whereIn($field, $value)
                        : $query->where($field, $value);
                }
            }
        }

        // Process data
        $processed = $query
            ->orderBy('date')
            ->get()
            ->groupBy('user_id')
            ->map(function ($records) {
                $normalHours = 0;
                $extraHours = 0;

                foreach ($records as $record) {
                    $normalSlots = [
                        [$record->am_time_in, $record->am_time_out],
                        [$record->pm_time_in, $record->pm_time_out],
                    ];

                    foreach ($normalSlots as [$in, $out]) {
                        if ($in && $out) {
                            $normalHours += Carbon::parse($in)->diffInMinutes(Carbon::parse($out)) / 60;
                        }
                    }

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

        // Manual pagination (Lighthouse compatible)
        $page = $args['page'] ?? 1;
        $perPage = $args['first'] ?? 10;

        $paginated = new LengthAwarePaginator(
            $processed->forPage($page, $perPage),
            $processed->count(),
            $perPage,
            $page
        );

        return [
            'paginatorInfo' => [
                'currentPage' => $paginated->currentPage(),
                'total' => $paginated->total(),
                'perPage' => $paginated->perPage(),
                'lastPage' => $paginated->lastPage(),
                'hasMorePages' => $paginated->hasMorePages(),
            ],
            'data' => $paginated->values(),
        ];
    }
}
