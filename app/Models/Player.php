<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Player extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'name', 'points', 'image'];

    public function matchesWon()
    {
        return $this->hasMany(MatchResult::class, 'winner_id');
    }
}

    