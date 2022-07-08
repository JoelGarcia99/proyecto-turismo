<?php

namespace App\Http\Controllers;

use App\Enums\Database\Attributes;
use App\Enums\Network\NetworkAttributes;
use App\Helpers\FileUploader;
use App\Models\Guide;
use App\Utilities\DateUtilities;
use Exception;
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

		// Only extracting needed DATA from the request
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

		// validating schedules. By default, at schedule should be at least 45 minutes longer
		$schedules = $params[Attributes::SCHEDULES];
		$error_message = DateUtilities::validateMinRangeBetweenDates($schedules);

		// If there is any string, then it means that there was an error
		if ($error_message != null) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => $error_message
			], NetworkAttributes::STATUS_400);
		}

		// sorting array before updating
		if (count($schedules) > 1) {
			// sorting the array by start range
			usort($dates, function ($a, $b) {
				return strtotime($a[Attributes::START_RANGE]) - strtotime($b[Attributes::START_RANGE]);
			});
		}

		// setting the DATA
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

		// validating schedules. By default, at schedule should be at least 45 minutes longer
		$schedules = $params[Attributes::SCHEDULES];
		$error_message = DateUtilities::validateMinRangeBetweenDates($schedules);

		// If there is any string, then it means that there was an error
		if ($error_message != null) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => $error_message
			], NetworkAttributes::STATUS_400);
		}

		// sorting array before updating
		if (count($schedules) > 1) {
			// sorting the array by start range
			usort($dates, function ($a, $b) {
				return strtotime($a[Attributes::START_RANGE]) - strtotime($b[Attributes::START_RANGE]);
			});
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
	public function delete($id)
	{
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

	/**
	 * updates the IMAGE of the guide
	 */
	public function updateImage(request $request)
	{
		// loading the IMAGE from the request
		$image = $request->file(attributes::IMAGE);
		$id = $request->id;

		if (!$image) {
			return response()->json([
				networkattributes::STATUS => networkattributes::STATUS_ERROR,
				networkattributes::MESSAGE => "debe proporcionar una imagen"
			], networkattributes::STATUS_400);
		}


		// searching for the guide
		$model = new guide();
		$guide = $model->find($id);

		if (!$guide) {
			return response()->json([
				networkattributes::STATUS => networkattributes::STATUS_ERROR,
				networkattributes::MESSAGE => "guide not found"
			], networkattributes::STATUS_400);
		}

		// creating the path
		$image_path = fileuploader::uploadimage($image, 'images/guides/');

		// validating the user is not uploading an invalid format
		if ($image_path === fileuploader::INVALID_EXTENSION_CODE) {

			$valid_extensions = implode(', ', fileuploader::$validExtensions);

			return response()->json([
				networkattributes::STATUS => networkattributes::STATUS_ERROR,
				networkattributes::MESSAGE => "invalid extension, the only allowed extensions are: " . $valid_extensions
			], networkattributes::STATUS_400);
		}

		// removing previous IMAGE before updating
		try {

			if ($guide->image_url != null && $guide->image_url != "") {
				unlink(public_path() . "/images/guides/" . $guide->image_url);
			}
		} catch (exception $e) {

		}

		// updating the IMAGE path
		$guide->update([
			attributes::IMAGE_URL=> $image_path
		]);

		return response()->json([
			networkattributes::STATUS => networkattributes::STATUS_SUCCESS,,
			networkattributes::MESSAGE => "IMAGE updated successfully",
			networkattributes::DATA => $image_path
		], networkattributes::STATUS_200);
	}

	/**
	 * Showing the list of all the active guides. This can be used without any
	 * kind of aithorization/role
	 */
	public function readActiveGuides()
	{
		$guides = Guide::where(Attributes::IS_ACTIVE, true)->get();

		if (!$guides) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => "No guides found"
			], NetworkAttributes::STATUS_404);
		}

		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::MESSAGE => "Guias consultados correctamente",
			NetworkAttributes::DATA => $guides
		], NetworkAttributes::STATUS_200);
	}
}
