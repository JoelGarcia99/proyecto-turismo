<?php

namespace App\Http\Controllers;

use App\Enums\Database\Attributes;
use App\Enums\Network\NetworkAttributes;
use App\Models\TouristicPoint;
use Illuminate\Http\Request;

class TouristicPointController extends Controller
{
	/**
	 * Creates a new touristic point
	 */
	public function create(Request $request) {

		// main model to perform DB operations
		$model = new TouristicPoint();

		// validating fields
		if(!$request->validate($model::$validation_rules)) {
			return response()->json([
				NetworkAttributes::STATUS => 'error',
				NetworkAttributes::MESSAGE => "Algunos campos son invalidos" //TODO: improve it
			], NetworkAttributes::STATUS_400);
		}

		// Mapping fields to an array simulating a JSON
		$body = $request->json()->all();

		// building model params
		$params = [];

		// generating an array of fields
		foreach($body as $key => $value) {
			if(in_array($key, $model::getAllAttributes())){
				$params[$key] = $value;
			}
		}

		// creating & storing on DB
		$model->create($params);

		return response()->json([
			NetworkAttributes::STATUS => 'success',
			NetworkAttributes::MESSAGE => 'Punto turístico creado correctamente',
		], NetworkAttributes::STATUS_200);
	}

	/**
	 * Updates a touristic point
	 */
	public function update(Request $request) {
		
		// main model to perform DB operations
		$model = TouristicPoint::find($request->id);

		if(!$model) {
			return response()->json([
				NetworkAttributes::STATUS => 'error',
				NetworkAttributes::MESSAGE => 'Punto turístico no encontrado'
			], NetworkAttributes::STATUS_404);
		}

		// validating fields
		if(!$request->validate(TouristicPoint::$validation_rules)) {
			return response()->json([
				NetworkAttributes::STATUS => 'error',
				NetworkAttributes::MESSAGE => "Algunos campos son invalidos" //TODO: improve it
			], NetworkAttributes::STATUS_400);
		}

		// Mapping fields to an array simulating a JSON
		$body = $request->json()->all();

		// building model params
		$params = [];

		// generating an array of fields
		foreach($body as $key => $value) {
			if(in_array($key, TouristicPoint::getAllAttributes())){
				$params[$key] = $value;
			}
		}

		// updating & storing on DB
		$model->update($params);

		return response()->json([
			NetworkAttributes::STATUS => 'success',
			NetworkAttributes::MESSAGE => 'Punto turístico actualizado correctamente',
		], NetworkAttributes::STATUS_200);
	}

	/**
	 * Loads all the touristic points with a reduced set of attributes
	 */
	public function loadTouristicPoints() {

		$model = new TouristicPoint();
		$touristicPoints = $model->all();

		return response()->json([
			NetworkAttributes::STATUS => 'success',
			NetworkAttributes::MESSAGE => 'Puntos turísticos cargados correctamente',
			NetworkAttributes::DATA => $touristicPoints
		], NetworkAttributes::STATUS_200);
	}

	/**
	 * Loads a touristic point with all its attributes
	 */
	public function loadById($id) {

		$model = new TouristicPoint();
		$touristicPoint = $model->find($id);

		if(!$touristicPoint) {
			return response()->json([
				NetworkAttributes::STATUS => 'error',
				NetworkAttributes::MESSAGE => 'Punto turístico no encontrado'
			], NetworkAttributes::STATUS_404);
		}

		return response()->json([
			NetworkAttributes::STATUS => 'success',
			NetworkAttributes::MESSAGE => 'Punto turístico cargado correctamente',
			NetworkAttributes::DATA => $touristicPoint
		], NetworkAttributes::STATUS_200);
	}

	/**
	 * Read a list of touristic points that are categorized as wonder
	 */
	public function readMaravillas() {
		$model = new TouristicPoint();
		$touristicPoints = $model->where(Attributes::IS_WONDER, '=', true)->get();

		if(!$touristicPoints) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => "No se han encontrado puntos turísticos"
			], NetworkAttributes::STATUS_404);
		}

		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::MESSAGE => "Puntos turísticos consultados correctamente",
			NetworkAttributes::DATA => $touristicPoints
		], NetworkAttributes::STATUS_200);
	}

	/**
	 * Read a touristic point by ID
	 */
	public function readBySlug(string $slug) {
		$model = new TouristicPoint();
		$touristicPoints = $model->where(Attributes::SLUG, '=', $slug)->get();

		if(!$touristicPoints || count($touristicPoints) == 0) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => "No se ha encontrado el punto turístico"
			], NetworkAttributes::STATUS_404);
		}

		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::MESSAGE => "Punto turístico consultado correctamente",
			NetworkAttributes::DATA => $touristicPoints[0]
		], NetworkAttributes::STATUS_200);
	}

	/**
	 *  Start loading a list of reservables touristic points
	 */
	public function readReservables() {
		$model = new TouristicPoint();
		$touristicPoints = $model->where(Attributes::ALLOW_RESERVATION, '=', true)->get();

		if(!$touristicPoints || count($touristicPoints) == 0) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => "No se han encontrado puntos turísticos"
			], NetworkAttributes::STATUS_404);
		}

		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::MESSAGE => "Puntos turísticos consultados correctamente",
			NetworkAttributes::DATA => $touristicPoints
		], NetworkAttributes::STATUS_200);
	}
}
