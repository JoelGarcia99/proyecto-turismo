<?php

namespace App\Http\Controllers;

use App\Enums\Network\NetworkAttributes;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

	/**
	 * Creates a new Category
	 */
	public function create(Request $request)
	{

		$model = new Category();

		if (!$request->validate($model::$validation_rules)) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => "Los campos no son validos" //TODO: fix it
			], 400);
		}


		// creating the 'schema'
		$body = $request->json()->all();
		$params = [];

		foreach ($body as $key => $value) {
			if (in_array($key, $model::getAllAttributes())) {
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
	public function read()
	{
		$model = new Category();
		$categories = $model->all();

		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_OK,
			NetworkAttributes::MESSAGE => "Categorias obtenidas correctamente",
			NetworkAttributes::DATA => $categories
		], NetworkAttributes::STATUS_200);
	}

	/**
	 * Search for categories based on an ID
	 */
	public function readById($id)
	{
		$model = new Category();
		$category = $model->find($id);

		if (!$category) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => "Categoria no encontrada"
			], NetworkAttributes::STATUS_404);
		}

		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_OK,
			NetworkAttributes::MESSAGE => "Categoria obtenida correctamente",
			NetworkAttributes::DATA => $category
		], NetworkAttributes::STATUS_200);
	}

	/**
	 * Updates a category
	 */
	public function update(Request $request, $id)
	{
		$model = new Category();
		$category = $model->find($id);

		if (!$category) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => "Categoria no encontrada"
			], NetworkAttributes::STATUS_404);
		}

		// Validating new fields
		if (!$request->validate($model::$validation_rules)) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => "Los campos no son validos" //TODO: fix it
			], 400);
		}

		// specifying which params is the user able to update
		$params = [];
		$body = $request->json()->all();

		foreach ($body as $key => $value) {
			if (in_array($key, $model::getAllAttributes())) {
				$params[$key] = $value;
			}
		}

		// updaing the model
		$category->update($params);

		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_OK,
			NetworkAttributes::MESSAGE => "Categoria actualizada correctamente",
			NetworkAttributes::DATA => $category
		], NetworkAttributes::STATUS_200);
	}

	/**
	 * Deletes a category from the DB. This is actually fully removed
	 * from the DB.
	 */
	public function delete($id) {
		// Searching for the model to update
		$model = new Category();
		$category = $model->find($id);

		// If the model is not found, return an error
		if (!$category) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => "Categoria no encontrada"
			], NetworkAttributes::STATUS_404);
		}

		$category->delete();

		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_OK,
			NetworkAttributes::MESSAGE => "Categoria eliminada correctamente"
		], NetworkAttributes::STATUS_200);
	}
}
