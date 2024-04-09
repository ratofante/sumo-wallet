<?php

namespace Database\Factories;

use App\Models\Expense;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Expense::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $startDate = now()->subMonths(3);
        $endDate = now();

        return [
            'name' => $this->faker->word,
            'amount' => $this->faker->randomFloat(2, 1, 1000),
            'created_at' => $this->faker->dateTimeBetween($startDate, $endDate),
            // 'wallet_id' => \App\Models\Wallet::factory()->create()->id, // Uncomment if you want to associate expenses with wallets
        ];
    }
}
