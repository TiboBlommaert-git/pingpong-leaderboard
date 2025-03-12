<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\PlayerController;
use App\Models\Player;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/leaderboard', [LeaderboardController::class, 'index']);
Route::post('/matchResult', [LeaderboardController::class, 'saveMatch']);
Route::post('/addPlayer', [PlayerController::class, 'addPlayer']);
Route::delete('/deletePlayer/{id}', [PlayerController::class, 'deletePlayer']);
Route::post('/resetPoints', function () {
    Player::query()->update(['points' => 0]);
});


