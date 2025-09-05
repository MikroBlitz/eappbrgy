<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserAvatarController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::middleware('role:admin')->group(function () {
        Route::apiResource('users', UserController::class);
    });

    Route::post('/users/{user}/avatar', [UserAvatarController::class, 'store']);
    Route::delete('/users/{user}/avatar', [UserAvatarController::class, 'destroy']);;

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', function (Request $request) {
        return $request->user();
    });
});


