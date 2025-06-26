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
        Schema::create('blotters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('complainant_id')->nullable()->constrained('residents')->nullOnDelete();
            $table->foreignId('respondent_id')->nullable()->constrained('residents')->nullOnDelete();
            $table->string('case_no')->unique();
            $table->string('complaint');
            $table->enum('status', ['open', 'resolved', 'dismissed'])->default('open'); // open, resolved, dismissed
            $table->text('details');
            $table->dateTime('incident_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blotters');
    }
};
