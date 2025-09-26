<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first() ?? User::factory()->create();

        $statuses = ['todo', 'in_progress', 'done'];
        $priorities = ['low', 'medium', 'high'];

        $tasks = [];

        foreach ($statuses as $statusIndex => $status) {
            for ($i = 1; $i <= 20; $i++) {
                $tasks[] = [
                    'title' => ucfirst($status).' Task '.$i,
                    'description' => 'This is a '.$status.' task. '.Str::random(20),
                    'status' => $status,
                    'priority' => $priorities[array_rand($priorities)],
                    'order' => $i,
                    'created_by' => $user->id,
                    'updated_by' => rand(0, 1) ? $user->id : null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        Task::insert($tasks);
    }
}
