<?php

namespace App\Http\Middleware;

use App\Enums\Network\NetworkAttributes;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class CustomAuth {

	public function handle(Request $request, Closure $next) {

		// loading the token from the header
		$token = $request->header('Authorization');

		// loading the user by the token
		$user = User::where('token', $token)->first();

		// checking if the user exists, if not then the user is not
		// logged in and the request is denied
		if (!$user) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => 'User not logged in'
			], NetworkAttributes::STATUS_401);
		}

		// setting the user in the request
		$request->session_user = $user;

		// returning the request
		return $next($request);
	}
}
