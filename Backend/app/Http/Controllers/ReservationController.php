<?php

namespace App\Http\Controllers;

use App\Enums\Database\Attributes;
use App\Enums\Network\NetworkAttributes;
use App\Models\Guide;
use App\Models\Reservation;
use App\Models\TouristicPoint;
use App\Models\User;
use App\Utilities\DateUtilities;
use Illuminate\Http\Request;

class ReservationController extends Controller
{

	/**
	 * Shows data of a specific reservation based on an ID
	 */
	public function read($id)
	{

		$reservation = Reservation::find($id)?->first();

		if ($reservation == null) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
				NetworkAttributes::MESSAGE => "Reserva no encontrada",
			], NetworkAttributes::STATUS_404);
		}

		//TODO: consider to add an email here
		//TODO: consider using aggregations instead of this strange thing
		$reservation->author = User::find($reservation->author_id)
			->only(Attributes::NAME, 'id');
		$reservation->guide = Guide::find($reservation->guide)
			->only(Attributes::NAME, Attributes::ID);
		$reservation->point = TouristicPoint::find($reservation->point)
			->only(Attributes::NAME, Attributes::ID);

		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::MESSAGE => "Mostrando datos de la reserva",
			NetworkAttributes::DATA => $reservation,
		], NetworkAttributes::STATUS_200);
	}

	/**
	 * Returns a set of reservations based on the given filter
	 */
	public function getReservations($filter)
	{
		// extracting the filter from the query param
		$filter = $filter ?? Reservation::ASSIGNED_TO_ME;

		// the list of reservations
		$reservations = [];

		switch ($filter) {
			case Reservation::STATUS_PENDING:
				$reservations = Reservation::where(
					Attributes::STATUS,
					Reservation::STATUS_PENDING
				)->get()->map(function ($review) {
					$review->author = User::find($review->author_id)
						->only(Attributes::NAME, Attributes::ID);
					$review->point = TouristicPoint::find($review->point)
						->only(Attributes::NAME, Attributes::ID);
					$review->guide = Guide::find($review->guide)
						->only(Attributes::NAME, Attributes::ID);

					return $review;
				});
				break;
			case Reservation::ASSIGNED_TO_ME:
				$reservations = Reservation::where(
					Attributes::STATUS,
					Reservation::ASSIGNED_TO_ME
				)->get()->map(function ($review) {
					$review->author = User::find($review->author_id);
					$review->point_ = TouristicPoint::find($review->point);

					return $review;
				});
				break;
		}

		// querying all the reservations that do not have any
		// administrator assigned to them
		return response()->json($reservations);
	}

	public function create(Request $request)
	{
		// main model to perform DB operations
		$model = new Reservation();

		// validating fields
		$request->validate($model::$validation_rules);

		// Mapping fields to an array simulating a JSON
		$body = $request->json()->all();

		// building model params
		$params = [];

		// generating an array of fields
		foreach ($body as $key => $value) {
			if (in_array($key, $model::getAllAttributes())) {
				$params[$key] = $value;
			}
		}

		// assigning the author to the reservation
		$params[Attributes::STATUS] = Reservation::STATUS_PENDING;

		// verifying the touristic point exists
		$touristicPoint = TouristicPoint::find($params[Attributes::POINT]);

		if (!$touristicPoint) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => "El punto turistico no existe"
			], NetworkAttributes::STATUS_404);
		}

		// searching the guide by the Id and the point
		$guide = Guide::where(
			Attributes::POINT_ID,
			$params[Attributes::POINT]
		)->where(
			Attributes::ID,
			$params[Attributes::GUIDE]
		)->first();

		if (!$guide) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
				NetworkAttributes::MESSAGE => "El guia no existe"
			], NetworkAttributes::STATUS_404);
		}

		// creating & storing on DB
		$data = $model->create($params);

		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::MESSAGE => "Reserva creada exitosamente",
			NetworkAttributes::DATA => $data
		], NetworkAttributes::STATUS_200);
	}

	public function loadAvailableGuides(Request $request)
	{
		// extracting point ID from query params
		$pointId = $request->query(Attributes::POINT_ID, null);
		$schedule = $request->query('schedule', null);

		// searching for the touristic point
		$point = TouristicPoint::find($pointId);

		// if point does not exist the return an empty array
		if (!$point) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => 'Punto turistico no encontrado'
			], NetworkAttributes::STATUS_404);
		}

		// searching for the guide based on the point & schedule
		$guide = Guide::where(Attributes::POINT_ID, $pointId)->get();

		// extracting the guides that contains the schedule in their schedules
		$availableGuides = [];

		foreach ($guide as $g) {
			// searching for every schedule
			foreach ($g->schedules as $s) {
				// if the schedule maths with the passed date then add the guide
				$from = $s['from'];

				// parsing timestamp to date
				$from = DateUtilities::parseTimestampToDate($from);

				// inverting day by month

				if ($from == $schedule) {
					array_push($availableGuides, $g);
				}
			}
		}

		// removing duplicated entries from the array
		$availableGuides = array_unique($availableGuides, SORT_REGULAR);

		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::MESSAGE => 'Mostrando guias disponibles',
			NetworkAttributes::DATA => $availableGuides
		], NetworkAttributes::STATUS_200);
	}
}
