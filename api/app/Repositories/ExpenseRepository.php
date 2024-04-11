<?php

namespace App\Repositories;

use App\Exceptions\GeneralJsonException;
use App\Models\Expense;
use Illuminate\Support\Facades\DB;

class ExpenseRepository extends BaseRepository
{
    public function create($attributes)
    {
        return DB::transaction(function () use ($attributes) {
            $created = Expense::create([
                'note' => data_get($attributes, 'note'),
                'wallet_id' => data_get($attributes, 'wallet_id'),
                'name' => data_get($attributes, 'name'),
                'amount' => data_get($attributes, 'amount')
            ]);

            throw_if(!$created, GeneralJsonException::class, 'Error creating expense');

            return $created;
        });
    }

    public function update($expense, $attributes)
    {
        return DB::transaction(function () use ($expense, $attributes) {

            $update = $expense->update([
                'name' => data_get($attributes, 'name', $expense->name),
                'amount' => data_get($attributes, 'amount', $expense->amount),
                'note' => data_get($attributes, 'note', $expense->note),
                'wallet_id' => data_get($attributes, 'wallet_id', $expense->wallet_id)
            ]);

            throw_if(!$update, GeneralJsonException::class, 'Failed attempting to update expense');

            return $expense;
        });
    }

    public function forceDelete($expense)
    {
        return DB::transaction(function () use ($expense) {
            $deleted = $expense->forceDelete();

            throw_if(!$deleted, GeneralJsonException::class, 'Failed to delete expense');

            return $deleted;
        });
    }
}
