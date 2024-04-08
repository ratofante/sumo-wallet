<?php

namespace App\Repositories;

use App\Exceptions\GeneralJsonException;
use App\Models\Wallet;
use Illuminate\Support\Facades\DB;

class WalletRepository extends BaseRepository
{
    /**
     * @param array
     * @return mixed;
     */
    public function create($attributes)
    {
        return DB::transaction(function () use ($attributes) {
            $created = Wallet::create([
                'name' => data_get($attributes, 'name'),
                'user_id' => data_get($attributes, 'user_id'),
            ]);

            throw_if(!$created, GeneralJsonException::class, 'Error creating a Wallet');

            return $created;
        });
    }

    public function update($wallet, $attributes)
    {
        return DB::transaction(function () use ($wallet, $attributes) {
            $update = $wallet->update([
                'name' => data_get($attributes, 'name'),
            ]);

            throw_if(!$update, GeneralJsonException::class, 'Error trying to update Wallet');

            return $wallet;
        });
    }

    public function forceDelete($wallet)
    {
        return DB::transaction(function () use ($wallet) {
            $deleted = $wallet->forceDelete();

            throw_if(!$deleted, GeneralJsonException::class, 'Error trying to delete Wallet');

            return $deleted;
        });
    }
}
