<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->dateTime('date');

            // Standard Time In/Out slots
            $table->dateTime('am_time_in')->nullable();
            $table->dateTime('am_time_out')->nullable();
            $table->dateTime('pm_time_in')->nullable();
            $table->dateTime('pm_time_out')->nullable();

            // Optional/custom slots
            $table->dateTime('extra_time_in_1')->nullable();
            $table->dateTime('extra_time_out_1')->nullable();
            $table->dateTime('extra_time_in_2')->nullable();
            $table->dateTime('extra_time_out_2')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
