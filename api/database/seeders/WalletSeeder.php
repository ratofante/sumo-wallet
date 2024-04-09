<?php

namespace Database\Seeders;

use App\Models\Expense;
use App\Models\Wallet;
use Database\Seeders\Traits\DisableForeignKeys;
use Database\Seeders\Traits\TruncateTable;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WalletSeeder extends Seeder
{
    use DisableForeignKeys, TruncateTable;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->disableForeignKeys();
        $this->truncate('wallets');

        $wallets = [
            [
                "name" => "Hobbies",
                "user_id" => 2
            ],
            [
                "name" => "Groceries",
                "user_id" => 2
            ],
            [
                "name" => "Expenses",
                "user_id" => 2
            ]
        ];

        foreach ($wallets as $walletData) {
            $numberOfExpenses = random_int(5, 15);
            $wallet = Wallet::create($walletData);

            $wallet->expenses()->createMany(
                Expense::factory()->count($numberOfExpenses)->make()->toArray()
            );
        }

        $this->enableForeignKeys();
    }
}
