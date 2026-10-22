<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('desc');
            $table->string('price')->nullable();
            $table->string('delivery')->nullable();
            $table->boolean('active')->default(true);
            $table->string('icon')->nullable();
            $table->timestamps();
            $table->index('active');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};