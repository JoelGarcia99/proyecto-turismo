<?php

namespace App\Http\Controllers;

use App\Enums\Database\Attributes;
use App\Enums\Network\NetworkAttributes;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
	public function login(Request $request) {
		// extracting credentials
		$credentials = $request->only(
			Attributes::EMAIL,
			Attributes::PASSWORD
		);

		// searching the user
		$user = User::where(Attributes::EMAIL, $credentials[Attributes::EMAIL])->first();

		// checking if the user exists
		if (!$user) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => 'User not found'
			], NetworkAttributes::STATUS_404);
		}

		// Encrypting the password
		$credentials[Attributes::PASSWORD] = Hash::make($credentials[Attributes::PASSWORD]);
		// checking if the password is correct
		if($user->password !== $credentials[Attributes::PASSWORD]) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => 'Password is incorrect'
			], NetworkAttributes::STATUS_401);
		}

		// creating a random secure token
		$token = Str::random(60);

		// updating the user's token
		$user->token = $token;

		// saving the user
		$user->save();

		// returning the user
		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::MESSAGE => 'User logged in',
			NetworkAttributes::DATA => $user,
		], NetworkAttributes::STATUS_200);

	}

	/**
	 * Register a new user and create a new access token
	 */
	public function register(Request $request) {
		$user = $request->json()->all();

		// Creating token
		$token = Str::random(60);

		// verifying the email is unique
		$user_with_same_email = User::where(Attributes::EMAIL, $user[Attributes::EMAIL])->first();

		if ($user_with_same_email) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => 'Email already exists'
			], NetworkAttributes::STATUS_409);
		}

		// Creating user
		$user = User::create([
			'email' => $user['email'],
			'password' => Hash::make($user['password']),
			'name' => $user['name'],
			'role' => 'user',
		]);

		// Updating token
		$user->token = $token;
		$user->save();


		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::MESSAGE => 'User created successfully',
			NetworkAttributes::USER => $user,
		], NetworkAttributes::STATUS_200);
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
