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
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{

	public function changeStatus(Request $request, string $status) {
		// extracting the reservation ID
		$reservationId = $request->reservation_id;

		// getting the reservation
		$reservation = Reservation::find($reservationId);

		// checking if the reservation exists
		if ($reservation == null) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => "La reserva no existe"
			], NetworkAttributes::STATUS_404);
		}

		// checking if the user is the admin of the reservation
		if (Auth::user()->id != $reservation->admin_id) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => "No tienes permiso para cambiar el estado de la reserva".Auth::user()->id

			], NetworkAttributes::STATUS_403);
		}

		// checking the new status is different from the current status
		if ($reservation->status == $status) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => "El estado de la reserva no ha cambiado"
			], NetworkAttributes::STATUS_400);
		}

		// checking if the status is valid
		if (!Reservation::isValidStatus($status)) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => "El estado no es válido"
			], NetworkAttributes::STATUS_400);
		}

		// updating the reservation
		$reservation->status = $status;
		$reservation->save();

		// TODO: add notifications (model & controller already created)
		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::MESSAGE => "El estado de la reserva ha sido cambiado"
		], NetworkAttributes::STATUS_200);
	}

	public function addComment(Request $request)
	{
		// extracting the comment
		$comment = $request->comment;

		// if the comment is empty then return an error
		if (empty($comment)) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => "El comentario no puede estar vacio"
			], NetworkAttributes::STATUS_400);
		}

		// extracting the reservation id
		$reservationId = $request->reservation_id;

		// extracting the user id
		$userId = $request->user_id;

		// searching the reservation
		$reservation = Reservation::find($reservationId);

		// checking if the reservation exists
		if ($reservation == null) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => "Reserva no encontrada"
			], NetworkAttributes::STATUS_404);
		}

		// checking if the user is the owner of the reservation or if it is the assigned admin
		if ($reservation->admin_id != $userId && $reservation->author_id != $userId) {

			$message = "";

			if($reservation->admin_id == null) {
				$message = "Debes asignarte este reserva para poder comentar.";
			} else {
				$message = "No eres el administrador de esta reserva";
			}

			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => $message
			], NetworkAttributes::STATUS_403);
		}

		// loading the user
		$user = User::find($userId);

		// adding the comment
		$history = $reservation->history ?? [];
		$history[] = [
			'comment' => $comment,
			'role' => $user->id == $reservation->author_id? 'user':'admin',
			'user_id' => $userId,
			'user_name' => $user->name,
			'date' => DateUtilities::getCurrentTimestamp()
		];

		// updating the reservation
		$reservation->history = $history;
		$reservation->save();

		// returning the response
		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::MESSAGE => "Comentario agregado correctamente",
			NetworkAttributes::DATA => $reservation
		], NetworkAttributes::STATUS_200);
	}
	/**
	 * Shows data of a specific reservation based on an ID
	 */
	public function read($id)
	{

		$reservation = Reservation::find($id);

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

		if ($reservation->admin_id) {
			$reservation->admin = User::find($reservation->admin_id)
				->only(Attributes::NAME, Attributes::ID);
		}

		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::MESSAGE => "Mostrando datos de la reserva",
			NetworkAttributes::DATA => $reservation,
		], NetworkAttributes::STATUS_200);
	}

	public function assignToMe(Request $request)
	{
		// reading the admin id
		$adminId = $request->admin_id;
		// reading the reservation id
		$reservationId = $request->reservation_id;

		// validating the reservation does not have any admin ID yet
		$reservation = Reservation::find($reservationId);

		// verifying the reservation exists
		if ($reservation == null) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => "Reserva no encontrada"
			], NetworkAttributes::STATUS_404);
		}

		if ($reservation->admin_id != null) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => "La reserva ya tiene un administrador asignado"
			], NetworkAttributes::STATUS_403);
		}

		// updating the reservation
		$reservation->admin_id = $adminId;
		$reservation->status = Reservation::STATUS_IN_PROGRESS;
		$reservation->save();

		// returning the response
		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::MESSAGE => "Reserva asignada correctamente"
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
				)->orWhere(
					Attributes::ADMIN_ID,
					null
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
					Attributes::ADMIN_ID,
					Auth::user()->id
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

		$user = User::find($params[Attributes::AUTHOR_ID]);

		// other params
		$params[Attributes::STATUS] = Reservation::STATUS_PENDING;
		$params[Attributes::HISTORY] = [[
			'start_message' => "El usuario " . $user->name .
				" ha creado la reserva para el punto turistico "
				. $touristicPoint->name,
			'role' => $user->id == $params[Attributes::AUTHOR_ID]? 'user':'admin',
			'user_id' => $user->id,
			'user_name' => $user->name,
			'date' => DateUtilities::getCurrentTimestamp()
		]];

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
