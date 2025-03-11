<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MatchResult extends Model
{
    use HasFactory;
    protected $table = 'matches';
    protected $fillable = ['winner_id', 'loser_id', 'points_awarded'];

    public function winner()
    {
        return $this->belongsTo(Player::class, 'winner_id');
    }

    public function loser()
    {
        return $this->belongsTo(Player::class, 'loser_id');
    }
}
