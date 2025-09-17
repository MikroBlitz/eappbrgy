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
            ->map(fn($records) => $this->calculateUserAttendance($records))
            ->values();

        // Pagination
        $page = $args['page'] ?? 1;
        $perPage = $args['first'] ?? 10;
        $paginated = $this->paginateCollection($processed, $page, $perPage);

        return [
            'data' => $paginated->values(),
            'paginatorInfo' => [
                'currentPage' => $paginated->currentPage(),
                'total' => $paginated->total(),
                'perPage' => $paginated->perPage(),
                'lastPage' => $paginated->lastPage(),
                'hasMorePages' => $paginated->hasMorePages(),
            ]
        ];
    }

    private function calculateUserAttendance($records): array
    {
        $normalHours = $this->calculateHours($records, [
            ['am_time_in', 'am_time_out'],
            ['pm_time_in', 'pm_time_out'],
        ]);

//        $extraHours = $this->calculateHours($records, [  // TODO: enable this when extra time is implemented
//            ['extra_time_in_1', 'extra_time_out_1'],
//            ['extra_time_in_2', 'extra_time_out_2'],
//        ]);

        $rate = $records->first()->user->hourly_rate ?? 0;
//        $salary = round(($normalHours * $rate) + ($extraHours * $rate * 2), 2); // TODO: enable this when extra time is implemented
        $salary = round($normalHours * $rate, 2);

        $totalWorkingDays = $records->pluck('date')
            ->map(fn($d) => Carbon::parse($d)->toDateString())
            ->unique()
            ->count();

        return [
            'user' => $records->first()->user,
//            'total_hours' => round($normalHours + $extraHours, 2), // TODO: enable this when extra time is implemented
            'total_hours' => round($normalHours, 2),
            'normal_hours' => round($normalHours, 2),
//            'extra_hours' => round($extraHours, 2), // TODO: enable this when extra time is implemented
            'salary' => $salary,
            'total_working_days' => $totalWorkingDays,
            'attendances' => $records->values(),
        ];
    }

    private function calculateHours($records, array $slots): float
    {
        $total = 0;
        foreach ($records as $record) {
            foreach ($slots as [$inKey, $outKey]) {
                $in = $record->{$inKey};
                $out = $record->{$outKey};
                if ($in && $out) {
                    $total += Carbon::parse($in)->diffInMinutes(Carbon::parse($out)) / 60;
                }
            }
        }
        return $total;
    }

    private function paginateCollection($collection, int $page, int $perPage): LengthAwarePaginator
    {
        return new LengthAwarePaginator(
            $collection->forPage($page, $perPage),
            $collection->count(),
            $perPage,
            $page
        );
    }
}
