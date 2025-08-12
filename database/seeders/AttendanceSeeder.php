<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AttendanceSeeder extends Seeder
{
    public function run(): void
    {
        $startDate = Carbon::createFromDate(null, 6, 1)->startOfDay(); // June 1 this year
        $endDate = Carbon::now()->startOfDay();

        // Define full-time and undertime employees
        $fullTimeUsers = range(1, 12); // First 12 users are mostly full-time
        $underTimeUsers = range(13, 20); // Last 8 users are mostly undertime

        for ($date = $startDate; $date->lte($endDate); $date->addDay()) {
            if ($date->isWeekend()) {
                continue; // Skip weekends
            }

            for ($userId = 1; $userId <= 20; $userId++) {
                // Determine if this day is full or undertime based on the group
                if (in_array($userId, $fullTimeUsers)) {
                    // Full-timers have 85% chance to be full day
                    $isFullDay = rand(1, 100) <= 85;
                } else {
                    // Undertime group has only 30% chance to be full day
                    $isFullDay = rand(1, 100) <= 30;
                }

                if ($isFullDay) {
                    // Full day example: 8:00–12:00 AM, 1:00–5:00 PM
                    $amTimeIn = $this->randomTimeInRange($date, '07:45', '08:15');
                    $amTimeOut = (clone $amTimeIn)->addHours(rand(3, 4));

                    $pmTimeIn = $this->randomTimeInRange($date, '12:45', '13:15');
                    $pmTimeOut = (clone $pmTimeIn)->addHours(rand(4, 5));
                } else {
                    // Undertime example: late start or early leave
                    $amTimeIn = $this->randomTimeInRange($date, '09:00', '10:30');
                    $amTimeOut = (clone $amTimeIn)->addHours(rand(1, 2));

                    $pmTimeIn = $this->randomTimeInRange($date, '13:30', '14:30');
                    $pmTimeOut = (clone $pmTimeIn)->addHours(rand(2, 3));
                }

                DB::table('attendances')->insert([
                    'user_id' => $userId,
                    'date' => $date->toDateString(),
                    'am_time_in' => $amTimeIn,
                    'am_time_out' => $amTimeOut,
                    'pm_time_in' => $pmTimeIn,
                    'pm_time_out' => $pmTimeOut,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    protected function randomTimeInRange(Carbon $date, string $startTime, string $endTime): Carbon
    {
        $start = Carbon::parse($startTime);
        $end = Carbon::parse($endTime);

        $startDateTime = $date->copy()->setTime($start->hour, $start->minute);
        $endDateTime = $date->copy()->setTime($end->hour, $end->minute);

        $diffMinutes = $startDateTime->diffInMinutes($endDateTime);
        $randomMinutes = rand(0, $diffMinutes);

        return $startDateTime->addMinutes($randomMinutes);
    }
}
