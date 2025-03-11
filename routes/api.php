<?php

use App\Http\Controllers\LeaderboardController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/leaderboard', [LeaderboardController::class, 'index']);
    Route::post('/matchResult', [LeaderboardController::class, 'saveMatch']);
});