<?php

namespace Database\Seeders;

use App\Models\Household;
use App\Models\Purok;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HouseholdSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $purokIds = Purok::pluck('id')->toArray();

        for ($i = 1; $i <= 200; $i++) {
            Household::create([
                'purok_id' => fake()->randomElement($purokIds),
                'household_no' => 'HH-' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'address' => fake()->address(),
            ]);
        }
    }
}
