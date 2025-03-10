<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Models\Match;
use Illuminate\Http\Request;

class LeaderboardController extends Controller
{
    public function index(){
        $players = Player::orderByDesc('points')->get();
        $leaderboard = [];
        $rank = 0;
        $previousPoints = null;
        foreach($players as $index => $player){
            if($player->points !== $previousPoints){
                $rank = $index + 1;
            }
            $leaderboard[] = ['rank' => $rank, 'name' => $player->name, 'points' => $player->points];
            $previousPoints = $player->points;
        }
        return response()->json($leaderboard);
    }
}
