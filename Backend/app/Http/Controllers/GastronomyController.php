<?php

namespace App\Http\Controllers;

use App\Enums\Network\NetworkAttributes;
use App\Models\TouristicPoint;

class GastronomyController extends Controller
{

	public function read() {
		// Reading all the touristic points
		// with only some fields
		$touristicPoints = TouristicPoint::select(
			'typical_plate_image_url',
			'typical_plate',
			'typical_plate_description',
			'name', 'address'
		)->where(
			'typical_plate', '!=', null
		)->get();

		// verifying the points exist
		if ($touristicPoints->count() == 0) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => 'No hay nada que cargar',
			], NetworkAttributes::STATUS_404);
		}

		// returning the points
		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::MESSAGE => 'Cargando platos tipicos',
			NetworkAttributes::DATA => $touristicPoints,
		], NetworkAttributes::STATUS_200);
	}
}
