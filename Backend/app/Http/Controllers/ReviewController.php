<?php

namespace App\Http\Controllers;

use App\Enums\Database\Attributes;
use App\Enums\Network\NetworkAttributes;
use App\Models\Review;
use App\Models\TouristicPoint;
use App\Models\User;
use Illuminate\Http\Request;

class ReviewController extends Controller
{

	public function create(Request $request)
	{

		$model = new Review();

		// validating fields
		$this->validate($request, $model::$validation_rules);

		// extracting the point ID and author ID from the request
		$point_id = $request->input(Attributes::POINT_ID);
		$author_id = $request->input(Attributes::AUTHOR_ID);

		// verifying the point exists
		$point = TouristicPoint::find($point_id);

		if (!$point) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => 'El punto turístico no existe',
			]);
		}

		// verifying the author exists
		$author = User::find($author_id);

		if (!$author) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => 'El autor no existe',
			]);
		}

		// creating the review
		$review = $model->create([
			Attributes::REVIEW_SCORE => $request->input(Attributes::REVIEW_SCORE),
			Attributes::REVIEW_COMMENT => $request->input(Attributes::REVIEW_COMMENT),
			Attributes::AUTHOR_ID => $author_id,
			Attributes::POINT_ID => $point_id,
		]);

		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::MESSAGE => "La review se ha agregado correctamente",
			NetworkAttributes::DATA => $review,
		]);
	}


	public function read(Request $request, $point)
	{

		$model = new Review();

		// extracting the point ID from the param URL
		$point_id = $point;

		// loading the reviews based on the point
		$reviews = $model->where(Attributes::POINT_ID, $point_id)->get();
	}
}
