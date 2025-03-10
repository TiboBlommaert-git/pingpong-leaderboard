<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MatchResult extends Model
{
    use HasFactory;

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
