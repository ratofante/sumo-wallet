<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\Traits\DisableForeignKeys;
use Database\Seeders\Traits\TruncateTable;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{

    use DisableForeignKeys, TruncateTable;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->disableForeignKeys();

        $this->truncate('users');

        User::create([
            'name' => 'cumbia',
            'email' => 'cumbia@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('cumbia1234'),
        ]);

        User::create([
            'name' => 'sumo',
            'email' => 'sumo@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('sumo1234'),
        ]);

        $this->enableForeignKeys();
    }
}
