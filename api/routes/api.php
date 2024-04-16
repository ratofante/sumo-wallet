<?php

use App\Http\Controllers\AvatarController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\WalletController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('wallet', WalletController::class);
    Route::apiResource('expense', ExpenseController::class);

    Route::post('/upload-avatar', [AvatarController::class, 'upload']);
    Route::get('/get-avatar', [AvatarController::class, 'get']);
});
