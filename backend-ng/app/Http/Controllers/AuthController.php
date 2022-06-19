<?php

namespace App\Http\Controllers;

use App\Enums\Network\NetworkAttributes;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
	public function login(Request $request) {
		// reading email & password
		$credentials = $request->json()->all();

		// Trying to log in
		if (!Auth::attempt($credentials)) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => 'Invalid credentials or the user does not exist',
			], NetworkAttributes::STATUS_401);
		}

		// creating access token
		$accessToken = auth()->user()->createToken('authToken')->accessToken;

		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::MESSAGE => 'Login successful',
			NetworkAttributes::USER => auth()->user(),
			NetworkAttributes::ACCESS_TOKEN => $accessToken,

		]);
	}

	/**
	 * Register a new user and create a new access token
	 */
	public function register(Request $request) {
		$user = $request->json()->all();

		//TODO: validate fields

		// Creating user
		$user = User::create([
			'email' => $user['email'],
			'password' => Hash::make($user['password']),
			'name' => $user['name'],
		]);

		// Creating access token
		$accessToken = $user->createToken('authToken')->accessToken;

		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::MESSAGE => 'User created successfully',
			NetworkAttributes::USER => $user,
			NetworkAttributes::ACCESS_TOKEN => $accessToken,
		]);
	}

	/**
	 * Verify if the user is logged in
	 */
	public function verifyToken(Request $request) {
		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::MESSAGE => 'Token verified successfully',
			NetworkAttributes::USER => auth()->user(),
		]);
	}
}
