<?php

namespace Database\Seeders;

use App\Models\Household;
use App\Models\Purok;
use App\Models\Resident;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ResidentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $householdIds = Household::pluck('id')->toArray();
        $purokIds = Purok::pluck('id')->toArray();

        for ($i = 1; $i <= 970; $i++) {
            $gender = fake()->randomElement(['male', 'female']);
            Resident::create([
                'household_id' => fake()->randomElement($householdIds),
                'purok_id' => fake()->randomElement($purokIds),
                'first_name' => fake()->firstName($gender),
                'middle_name' => fake()->optional()->lastName(),
                'last_name' => fake()->lastName(),
                'suffix' => fake()->optional()->suffix(),
                'citizenship' => 'Filipino',
                'phone' => fake()->optional()->phoneNumber(),
                'email' => fake()->optional()->safeEmail(),
                'birthdate' => fake()->dateTimeBetween('-80 years', '-1 years'),
                'gender' => $gender,
                'civil_status' => fake()->randomElement(['single', 'married', 'separated', 'widowed']),
            ]);
        }
    }
}
