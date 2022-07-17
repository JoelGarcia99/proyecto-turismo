<?php

namespace App\Http\Controllers;

use App\Enums\Database\Attributes;
use App\Enums\Network\NetworkAttributes;
use App\Models\Guide;
use App\Models\Reservation;
use App\Models\TouristicPoint;
use App\Utilities\DateUtilities;
use Illuminate\Http\Request;

class ReservationController extends Controller
{

	public function getReservations(Request $request)
	{
		// extracting the filter from the query param
		$filter = $request->query(Attributes::FILTER) ?? Reservation::ASSIGNED_TO_ME;

		// the list of reservations
		$reservations = [];

		switch($filter) {
		case Reservation::STATUS_UNATTENDED:
			$reservations = Reservation::where(
				Attributes::STATUS, 
				Reservation::PENDING
			)->orWhere(

			)->get();
			break;
		}
		// querying all the reservations that do not have any
		// administrator assigned to them
		$reservations = Reservation::where(
			Attributes::STATUS,
			Reservation::STATUS_UNATTENDED
		)->orWhere(
			Attributes::STATUS,
			null
		)->get();

		return response()->json($reservations);
	}

	public function create(Request $request) {
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
