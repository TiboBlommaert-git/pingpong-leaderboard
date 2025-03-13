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
        'image' => 'nullable|image|mimes:jpg,jpeg,png,bmp,gif,svg|max:10240',  
    ]);

    $imagePath = null;
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('players', 'public');
    }

    $player = Player::create([
        'name' => $request->name,
        'points' => 0,
        'image' => $imagePath, 
    ]);

    return response()->json([
        'player' => $player,
        'image' => $imagePath ? asset('storage/' . $imagePath) : null 
    ]);
}

    public function deletePlayer($id){
    $player = Player::find($id);

    if (!$player) {
        return response()->json(['message' => 'Player not found'], 404);
    }
    $player->delete();
    return response()->json(['message' => 'Player deleted successfully']);
    }	
}
