<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LeaderboardController;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/players', function () {
    return view('players.index');
});

Route::get('/players/{id}', function ($id) {
    return view('players.show', ["id"=>$id]);
});

Route::get('/leaderboard', function () {
    return view('players.index');
});