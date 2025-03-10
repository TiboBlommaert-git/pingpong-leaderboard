<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Player;

class LeaderboardTest extends TestCase
{
    use RefreshDatabase; // Ensures fresh database for each test

    public function test_leaderboard_returns_correct_data()
    {
        // Arrange: Create test players
        Player::factory()->create(['name' => 'Alice', 'points' => 100]);
        Player::factory()->create(['name' => 'Bob', 'points' => 90]);
        Player::factory()->create(['name' => 'Charlie', 'points' => 90]);

        // Act: Make a GET request to the leaderboard route
        $response = $this->getJson('/leaderboard');

        // Assert: Check response status
        $response->assertStatus(200)
                 ->assertJson([
                     ['rank' => 1, 'name' => 'Alice', 'points' => 100],
                     ['rank' => 2, 'name' => 'Bob', 'points' => 90],
                     ['rank' => 2, 'name' => 'Charlie', 'points' => 90],
                 ]);
    }
}
