<?php

namespace Database\Seeders;

use App\Models\Purok;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PurokSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 50; $i++) {
            Purok::create([
                'name' => "Purok $i"
            ]);
        }
    }
}
