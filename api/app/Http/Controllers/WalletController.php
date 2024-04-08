<?php

namespace App\Http\Controllers;

use App\Http\Requests\Wallet\StoreWalletRequest;
use App\Http\Requests\Wallet\UpdateWalletRequest;
use App\Http\Resources\WalletResource;
use App\Models\Wallet;
use App\Repositories\WalletRepository;
use Illuminate\Http\JsonResponse;

class WalletController extends Controller
{
    /**
     * Display a listing of the wallets belonging to the authenticated user.
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $wallets = auth()->user()->wallets;
        return WalletResource::collection($wallets);
    }

    /**
     * Store a newly created wallet resource in storage.
     * @param  StoreWalletRequest  $request
     * @param  WalletRepository  $repository
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function store(StoreWalletRequest $request, WalletRepository $repository)
    {
        $wallet = $repository->create($request);
        return new WalletResource($wallet);
    }

    /**
     * Display the specified wallet resource.
     * @param  string  $id
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function show(string $id)
    {
        $wallet = Wallet::with('expenses')->find($id);
        return new WalletResource($wallet);
    }

    /**
     * Update the specified wallet resource in storage.
     * @param  Wallet  $wallet
     * @param  UpdateWalletRequest  $request
     * @param  WalletRepository  $repository
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function update(Wallet $wallet, UpdateWalletRequest $request, WalletRepository $repository)
    {
        $wallet = $repository->update($wallet, $request);
        return new WalletResource($wallet);
    }

    /**
     * Remove the specified wallet resource from storage.
     * @param  Wallet  $wallet
     * @param  WalletRepository  $repository
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Wallet $wallet, WalletRepository $repository)
    {
        $wallet = $repository->forceDelete($wallet);
        return new JsonResponse([
            'data' => 'success'
        ]);
    }
}
