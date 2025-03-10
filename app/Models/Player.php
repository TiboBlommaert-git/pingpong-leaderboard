<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'points'];

    public function matchesWon()
    {
        return $this->hasMany(MatchResult::class, 'winner_id');
    }
}

    