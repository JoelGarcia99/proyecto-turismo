<?php

namespace App\Http\Controllers;

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

		// updating & storing on DB
		$model->update($params);

		return response()->json([
			NetworkAttributes::STATUS => 'success',
			NetworkAttributes::MESSAGE => 'Punto turístico actualizado correctamente',
		], NetworkAttributes::STATUS_200);
	}


	public function loadTouristicPoints(Request $request) {

		$model = new TouristicPoint();
		$touristicPoints = $model->all();

		return response()->json([
			NetworkAttributes::STATUS => 'success',
			NetworkAttributes::MESSAGE => 'Puntos turísticos cargados correctamente',
			NetworkAttributes::DATA => $touristicPoints
		], NetworkAttributes::STATUS_200);
	}
}
