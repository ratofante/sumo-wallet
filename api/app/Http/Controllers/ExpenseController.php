<?php

namespace App\Http\Controllers;

use App\Http\Requests\Expense\StoreExpenseRequest;
use App\Http\Requests\Expense\UpdateExpenseRequest;
use App\Http\Resources\ExpenseResource;
use App\Models\Expense;
use App\Repositories\ExpenseRepository;
use Illuminate\Http\JsonResponse;

class ExpenseController extends Controller
{
    public function index()
    {
        $expenses = Expense::query()->paginate(20);
        return ExpenseResource::collection($expenses);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreExpenseRequest  $request
     * @param  ExpenseRepository  $repository
     * @return ExpenseResource
     */
    public function store(StoreExpenseRequest $request, ExpenseRepository $repository)
    {
        $expense = $repository->create($request);
        return new ExpenseResource($expense);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $id
     * @return ExpenseResource
     */
    public function show(string $id)
    {
        $expense = Expense::find($id);
        return new ExpenseResource($expense);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Expense  $expense
     * @param  UpdateExpenseRequest  $request
     * @param  ExpenseRepository  $repository
     * @return ExpenseResource
     */
    public function update(UpdateExpenseRequest $request, Expense $expense,  ExpenseRepository $repository)
    {
        $expense = $repository->update($expense, $request);
        return new ExpenseResource($expense);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Expense  $expense
     * @param  ExpenseRepository  $repository
     * @return JsonResponse
     */
    public function destroy(Expense $expense, ExpenseRepository $repository)
    {
        $repository->forceDelete($expense);
        return new JsonResponse([
            'data' => 'success'
        ]);
    }
}
