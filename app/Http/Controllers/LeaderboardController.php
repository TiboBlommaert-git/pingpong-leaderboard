<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Models\MatchResult;
use Illuminate\Http\Request;

class LeaderboardController extends Controller
{
    public function index() {
        $players = Player::orderByDesc('points')->get();
        $leaderboard = [];
        $rank = 0;
        $previousPoints = null; 

        foreach ($players as $index => $player) {
            
            if ($player->points !== $previousPoints) {
                $rank += 1; 
            }


            $leaderboard[] = [
                'rank' => $rank,
                'id' => $player->id,
                'name' => $player->name,
                'points' => $player->points,
                'image' => $player->image
            ];
            $previousPoints = $player->points;
        }
        return response()->json($leaderboard);
    }
    
    public function saveMatch(Request $match){
        $match->validate([
            'winner' => 'required|string|exists:players,name',
            'loser' => 'required|string|exists:players,name',
        ]); 
        $winner = Player::where('name', $match->winner)->first();
        $loser = Player::where('name', $match->loser)->first();
        $points_awarded = 1;
        if($loser->points > $winner->points){
            $points_awarded = 2;
        }
        MatchResult::create([
            'winner_id' => $winner->id,
            'loser_id' => $loser->id,
            'points_awarded' => $points_awarded,
        ]);
        $winner->increment('points', $points_awarded);
        return response()->json([
            'message'=> 'Match recorded succesfully!',
            'winner' => $winner->name,
            'loser' => $loser->name,
            'points_awarded' => $points_awarded,
        ]);
    }
}
