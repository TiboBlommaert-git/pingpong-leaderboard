<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Player;

class PlayerController extends Controller
{
    public function addPlayer(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:players,name',
        ]);

        $player = Player::create([
            'name' => $request->name,
            'points' => 0,
        ]);

        return response()->json([
            'message' => 'Player added successfully!',
            'player' => $player
        ]);
    }
}
