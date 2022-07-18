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

	public function getRatingSummary($pointId) {
		// searching the point to verify it exists
		$point = TouristicPoint::where(Attributes::ID, $pointId)->first();

		if(!$point) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => "El punto turístico no existe"
			], NetworkAttributes::STATUS_404);
		}

		// creating an aggregation to group scores
		// getting the reviews of the point, grouping by the review_score
		$reviews = Review::where(Attributes::POINT_ID, $pointId)->get();

		// summarizing the output [$reviews] to show the number of review for every score
		$summary = [];

		// iterating over the reviews to get the score and the number of reviews for that score
		foreach($reviews as $review) {
			$score = $review->review_score;
			$summary[$score] = isset($summary[$score]) ? $summary[$score] + 1: 1;
		}

		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::MESSAGE => "Resumen de calificaciones",
			NetworkAttributes::DATA => $summary
		], NetworkAttributes::STATUS_200);

	}


	public function readByTouristicPoint(Request $request, $id)
	{
		$touristicPoint = TouristicPoint::find($id);
		if ($touristicPoint == null) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => "No se encontró el punto turístico",
			], NetworkAttributes::STATUS_404);
		}

		$userId = $request->query(Attributes::USER_ID);

		// if the userID is provided, we only return the review of the user
		if ($userId != null) {
			$reviews = Review::where(Attributes::POINT_ID, $id)
				->where(Attributes::AUTHOR_ID, $userId)
				->first();
		} else {
			// making a mongoDB aggregation to get the user name instead of the ID
			$reviews = Review::where(Attributes::POINT_ID, $id)
				->get()
				->map(function ($review) {
					$review->author = User::find($review->author_id)->name;
					return $review;
				})->take(3);
		}

		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::MESSAGE => "Mostrando ultimas reseñas",
			NetworkAttributes::DATA => $reviews,
		], NetworkAttributes::STATUS_200);
	}

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

		$store_review = Review::where(Attributes::POINT_ID, $point_id)
			->where(Attributes::AUTHOR_ID, $author_id)
			->first();

		$params_to_update = [
			Attributes::REVIEW_SCORE => $request->input(Attributes::REVIEW_SCORE),
			Attributes::REVIEW_COMMENT => $request->input(Attributes::REVIEW_COMMENT),
			Attributes::AUTHOR_ID => $author_id,
			Attributes::POINT_ID => $point_id,
		];

		$review = null;

		// if the review already exists, we update it
		if ($store_review) {
			$review = $store_review->update($params_to_update);
		} else {
			$review = $model->create($params_to_update);
		}

		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::MESSAGE => "La review se ha agregado correctamente",
			NetworkAttributes::DATA => $review,
		]);
	}


	public function read($point)
	{

		$model = new Review();

		// extracting the point ID from the param URL
		$point_id = $point;

		// loading the reviews based on the point
		$reviews = $model->where(Attributes::POINT_ID, $point_id)->get();

		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::MESSAGE => "Las reviews se han cargado correctamente",
			NetworkAttributes::DATA => $reviews,
		]);
	}
}
