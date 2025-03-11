<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LeaderboardController;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/leaderboard', [LeaderboardController::class, 'index']);
Route::post('/matchResult', [LeaderboardController::class, 'saveMatch']);

