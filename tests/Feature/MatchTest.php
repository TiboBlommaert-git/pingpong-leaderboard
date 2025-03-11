<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Player;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MatchTest extends TestCase
{
    use RefreshDatabase;
    public function test_save_match()
    {
        $player1 = Player::factory()->create(['name' => 'Player1', 'points' => 5]);
        $player2 = Player::factory()->create(['name' => 'Player2', 'points' => 10]);

        $response = $this->postJson('/matchResult', [
            'winner' => 'Player1',
            'loser' => 'Player2',
        ]);

        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'Match recorded succesfully!',
                     'winner' => 'Player1',
                     'loser' => 'Player2',
                     'points_awarded' => 2,
                 ]);
        
        $this->assertEquals(7, $player1->fresh()->points);
    }
}

