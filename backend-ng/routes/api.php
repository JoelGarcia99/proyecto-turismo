<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TouristicPointController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/manage/punto-turistico/', [TouristicPointController::class, 'create']);
Route::PUT('/manage/punto-turistico/{id}', [TouristicPointController::class, 'update']);
Route::get('/manage/puntos-turisticos/', [TouristicPointController::class, 'loadTouristicPoints']);

Route::get('/manage/categories/', [CategoryController::class, 'read']);
Route::post('/manage/category/', [CategoryController::class, 'create']);
