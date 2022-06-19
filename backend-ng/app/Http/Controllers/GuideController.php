<?php

namespace App\Http\Controllers;

use App\Enums\Network\NetworkAttributes;
use App\Models\Guide;
use Illuminate\Http\Request;

class GuideController extends Controller
{

	/**
	 * Read all the guides from the database with a limited set of attributes
	 */
	public function read()
	{
		$model = new Guide();
		//TODO: specify only the attributes that are needed
		$guides = $model->all();

		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::DATA => $guides
		], NetworkAttributes::STATUS_200);
	}

	/**
	 * Creates a new guide in the database
	 */
	public function create(Request $request)
	{

		// Validating params, if any is not ok then a bad state is returned
		$request->validate(Guide::$validation_rules);

		// Only extracting needed data from the request
		$body = $request->json();

		// defining the model
		$model = new Guide();

		// list of allowed params to be set
		$params = [];

		foreach ($body as $key => $value) {
			if (in_array($key, $model::getAllAttributes())) {
				$params[$key] = $value;
			}
		}

		// setting the data
		$model->create($params);

		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::MESSAGE => "Guide created successfully",
		], NetworkAttributes::STATUS_200);
	}

	/**
	 * Searches for a guide based on an ID
	 */
	public function readById($id)
	{
		// searching for the guide
		$model = new Guide();
		$guide = $model->find($id);

		if ($guide) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
				NetworkAttributes::MESSAGE => "Guide found",
				NetworkAttributes::DATA => $guide
			], NetworkAttributes::STATUS_200);
		} else {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => "Guide not found"
			], NetworkAttributes::STATUS_404);
		}
	}

	public function update(Request $request, $id)
	{
		// Validating params, if any is not ok then a bad state is returned
		$request->validate(Guide::$validation_rules);

		// extracting fields form the request
		$body = $request->json();

		// defining the model
		$model = new Guide();

		// list of allowed params to be set
		$params = [];

		foreach ($body as $key => $value) {
			if (in_array($key, $model::getAllAttributes())) {
				$params[$key] = $value;
			}
		}

		// searching for the guide
		$guide = $model->find($id);

		if ($guide) {
			// updating the guide
			$guide->update($params);

			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
				NetworkAttributes::MESSAGE => "Guide updated successfully",
				NetworkAttributes::DATA => $guide
			], NetworkAttributes::STATUS_200);
		} else {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => "Guide not found"
			], NetworkAttributes::STATUS_404);
		}
	}

	/**
	 * Delete a guide from the database
	 */
	public function delete($id) {
		// searching for the guide
		$model = new Guide();
		$guide = $model->find($id);

		if ($guide) {
			// deleting the guide
			$guide->delete();

			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
				NetworkAttributes::MESSAGE => "Guide deleted successfully"
			], NetworkAttributes::STATUS_200);
		} else {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => "Guide not found"
			], NetworkAttributes::STATUS_404);
		}
	}
}
