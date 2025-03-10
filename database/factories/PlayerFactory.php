<?php

namespace Database\Factories;

use App\Models\Player;
use Illuminate\Database\Eloquent\Factories\Factory;

class PlayerFactory extends Factory
{
    protected $model = Player::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'points' => $this->faker->numberBetween(0, 100),
        ];
    }
}
