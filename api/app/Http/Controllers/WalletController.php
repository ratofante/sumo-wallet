<?php

namespace App\Http\Controllers;

use App\Http\Requests\Wallet\StoreWalletRequest;
use App\Http\Requests\Wallet\UpdateWalletRequest;
use App\Http\Resources\WalletResource;
use App\Models\Wallet;
use App\Repositories\WalletRepository;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class WalletController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Retrieve wallets belonging to the authenticated user
        $wallets = auth()->user()->wallets;

        // Return the wallets using WalletResource
        return WalletResource::collection($wallets);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWalletRequest $request, WalletRepository $repository)
    {
        $wallet = $repository->create($request);
        return new WalletResource($wallet);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $wallet = Wallet::with('expenses')->find($id);
        return new WalletResource($wallet);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Wallet $wallet, UpdateWalletRequest $request, WalletRepository $repository)
    {
        $wallet = $repository->update($wallet, $request);

        return new WalletResource($wallet);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Wallet $wallet, WalletRepository $repository)
    {
        $wallet = $repository->forceDelete($wallet);

        return new JsonResponse([
            'data' => 'success'
        ]);
    }
}
