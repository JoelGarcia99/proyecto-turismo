<?php

namespace App\Http\Controllers;

use App\Enums\Network\NetworkAttributes;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

	public function create(Request $request) {

		$model = new Category();

		if(!$request->validate($model::$validation_rules)) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => "Los campos no son validos" //TODO: fix it
			], 400);
		}


		// creating the 'schema'
		$body = $request->json()->all();
		$params = [];

		foreach($body as $key => $value) {
			if(in_array($key, $model::getAllAttributes())){
				$params[$key] = $value;
			}
		}

		$model->create($params);

		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_OK,
			NetworkAttributes::MESSAGE => "Categoria creada correctamente"
		], NetworkAttributes::STATUS_200);
	}

	/**
	 * Reads categories with all their attributes
	 */
	public function read() {
		$model = new Category();
		$categories = $model->all();

		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_OK,
			NetworkAttributes::MESSAGE => "Categorias obtenidas correctamente",
			NetworkAttributes::DATA => $categories
		], NetworkAttributes::STATUS_200);
	}
}
