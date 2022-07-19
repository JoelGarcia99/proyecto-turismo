<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\GuideController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TouristicPointController;
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

// Auth routes
Route::prefix('auth')->group(function () {
	Route::POST('login', [AuthController::class, 'login']);
	Route::POST('register', [AuthController::class, 'register']);
});

Route::middleware(['auth:api'])->group(function(){
	// Touristic points
	Route::POST('/manage/punto-turistico/', [TouristicPointController::class, 'create']);
	Route::PUT('/manage/punto-turistico/{id}', [TouristicPointController::class, 'update']);
	Route::GET('/manage/punto-turistico/{id}', [TouristicPointController::class, 'loadById']);
	Route::GET('/manage/puntos-turisticos/', [TouristicPointController::class, 'loadTouristicPoints']);
	Route::POST('/manage/puntos-turisticos/{id}/upload-image', [TouristicPointController::class, 'updateImage']);

	// Categories
	Route::GET('/manage/categories/', [CategoryController::class, 'read']);
	Route::GET('/manage/categories/{id}', [CategoryController::class, 'readById']);
	Route::POST('/manage/category/', [CategoryController::class, 'create']);
	Route::PUT('/manage/category/{id}', [CategoryController::class, 'update']);
	Route::DELETE('/manage/category/{id}', [CategoryController::class, 'delete']);

	Route::GET('/auth/verify-token', [AuthController::class, 'verifyToken']);

	// Guides
	Route::GET('/manage/guides/', [GuideController::class, 'read']);
	Route::GET('/manage/guide/{id}', [GuideController::class, 'readById']);
	Route::PUT('/manage/guide/{id}', [GuideController::class, 'update']);
	Route::DELETE('/manage/guide/{id}', [GuideController::class, 'delete']);
	Route::POST('/manage/guide/', [GuideController::class, 'create']);
	Route::POST('/manage/guide/{id}/upload-image', [GuideController::class, 'updateImage']);

	// reviews
	Route::POST('/review/', [ReviewController::class, 'create']);

	// reservations
	Route::GET('/manage/reservation/{id}', [ReservationController::class, 'read']);
	Route::GET('/manage/reservations/{filter}', [
		ReservationController::class, 'getReservations'
	]);

	Route::POST('/manage/reservation/comment', [ReservationController::class, 'addComment']);
	Route::POST('/manage/reservation/assign-to-me', [ReservationController::class, 'assignToMe']);
});

// Public routes
Route::GET('/guides', [GuideController::class, 'readActiveGuides']);

// Maravillas
Route::GET('/puntos-turisticos/maravillas', [TouristicPointController::class, 'readMaravillas']);
Route::GET('/punto-turistico/{slug}', [TouristicPointController::class, 'readBySlug']);
Route::GET('/puntos-turisticos/reservables', [TouristicPointController::class, 'readReservables']);
Route::GET('/puntos-turisticos', [TouristicPointController::class, 'readByCategories']);

// reservations
Route::POST('/reservation/', [ReservationController::class, 'create']);
Route::GET('/reservation/load-available-guides', [ReservationController::class, 'loadAvailableGuides']);

// Reviews
Route::GET('/review/punto-turistico/{id}', [ReviewController::class, 'readByTouristicPoint']);
Route::GET('/review/stats/{pointId}', [ReviewController::class, 'getRatingSummary']);
