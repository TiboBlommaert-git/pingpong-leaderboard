<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('matches', function (Blueprint $table) {
        $table->id();
        $table->foreignId('winner_id')
            ->constrained('players')
            ->onDelete('cascade'); // Cascading delete
        $table->foreignId('loser_id')
            ->constrained('players')
            ->onDelete('cascade'); // Cascading delete
        $table->integer('points_awarded')->default(1);
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};
