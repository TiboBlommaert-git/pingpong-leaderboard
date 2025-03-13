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
            'id' => $this->faker->unique()->numberBetween(1, 1000),
            'name' => $this->faker->name(),
            'points' => $this->faker->numberBetween(0, 100),
            'image' => $this->faker->image('public/images', 640, 480, 'cats', false),
        ];
    }
}
