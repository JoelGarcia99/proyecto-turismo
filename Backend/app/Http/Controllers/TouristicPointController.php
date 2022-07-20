<?php

namespace App\Http\Controllers;

use App\Enums\Database\Attributes;
use App\Enums\Network\NetworkAttributes;
use App\Helpers\FileUploader;
use App\Models\Guide;
use App\Models\TouristicPoint;
use Exception;
use Illuminate\Http\Request;

class TouristicPointController extends Controller
{

	public function delete($id) {
		// Get the touristic point
		$touristicPoint = TouristicPoint::find($id);

		// validating it exists
		if (!$touristicPoint) {
			return response()->json([
				NetworkAttributes::STATUS => NetworkAttributes::STATUS_ERROR,
				NetworkAttributes::MESSAGE => "El punto turístico ya no existe"
			], NetworkAttributes::STATUS_404);
		}

		// Delete the touristic point
		$touristicPoint->delete();

		// Return the response
		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::MESSAGE => "El punto turístico ha sido eliminado"
		], NetworkAttributes::STATUS_200);
	}

	/**
	 * updates the image of the guide
	 */
	public function updateImage(request $request)
	{
		// loading the image from the request
		$image = $request->file(attributes::IMAGE);
		$id = $request->id;

		// query params to determine if it is the main image or not
		$isMainImage = $request->query(attributes::IS_MAIN_IMAGE, 'false');
		$isMainImage = $isMainImage == 'true';

		if (!$image) {
			return response()->json([
				networkattributes::STATUS => networkattributes::STATUS_ERROR,
				networkattributes::MESSAGE => "Debe proporcionar una imagen"
			], networkattributes::STATUS_404);
		}


		// searching for the guide
		$model = new TouristicPoint();
		$touristicPoint = $model->find($id);

		if (!$touristicPoint) {
			return response()->json([
				networkattributes::STATUS => networkattributes::STATUS_ERROR,
				networkattributes::MESSAGE => "Punto turístico no encontrado"
			], networkattributes::STATUS_404);
		}

		// creating the path
		$image_path = FileUploader::uploadimage($image, 'images/touristic_points/');

		// validating the user is not uploading an invalid format
		if ($image_path === fileuploader::INVALID_EXTENSION_CODE) {

			$valid_extensions = implode(', ', FileUploader::$validExtensions);

			return response()->json([
				networkattributes::STATUS => networkattributes::STATUS_ERROR,
				networkattributes::MESSAGE => "Extension no soportada, las unicas soportadas son: " . $valid_extensions
			], networkattributes::STATUS_400);
		}

		// removing previous image before updating
		try {
			// It is not needed for the other images since if two identicals images are uploaded
			// they will just be uploaded together with different IDs.
			if ($isMainImage && $touristicPoint->main_image != null && $touristicPoint->main_image != "") {
				unlink(public_path() . "/images/touristic_points/" . $touristicPoint->main_image);
			}
			else if($request->query(Attributes::IS_TYPICAL_PLATE_IMAGE) == 'true') {
				unlink(public_path() . "/images/touristic_points/" . $touristicPoint->typical_plate_image);
			}
		} catch (Exception) { }

		// Updating the image according to its type
		if ($isMainImage) {
			$touristicPoint->update([
				Attributes::MAIN_IMAGE_URL => "/images/touristic_points/" . $image_path
			]);
		} else if($request->query(attributes::IS_TYPICAL_PLATE_IMAGE, 'false')=='true') {
			$touristicPoint->update([
				Attributes::TYPICAL_PLATE_IMAGE_URL => "/images/touristic_points/" . $image_path
			]);
		}
		else {
			// Appending the new image to the previous ones
			$imageList = $touristicPoint->images ?? [];
			$imageList[] = "/images/touristic_points/" . $image_path;

			$touristicPoint->update([
				Attributes::IMAGES => $imageList
			]);
		}

		return response()->json([
			networkattributes::STATUS => networkattributes::STATUS_SUCCESS,
			networkattributes::MESSAGE => "La imagen se actualizó correctamente",
			networkattributes::DATA => $image_path
		], networkattributes::STATUS_200);
	}
	/**
	 * Returns all the touristic points classified by categories
	 */
	public function readByCategories()
	{
		// querying all the touristic points
		$touristicPoints = TouristicPoint::all();

		// storing all the categories with their touristic points
		$categoriesWithTP = [];

		// going through each touristic point
		foreach ($touristicPoints as $touristicPoint) {
			// getting the category
			$category = $touristicPoint->category;

			$categoriesWithTP[$category][] = $touristicPoint;
		}

		return response()->json([
			NetworkAttributes::STATUS => NetworkAttributes::STATUS_SUCCESS,
			NetworkAttributes::MESSAGE => 'Mostrando todos los puntos turisticos',
			NetworkAttributes::DATA => $categoriesWithTP
		], NetworkAttributes::STATUS_200);
	}

	/**
	 * Creates a new touristic point
	 */
	public function create(Request $request)
	{

		// main model to perform DB operations
		$model = new TouristicPoint();

		// validating fields
		if (!$request->validate($model::$validation_rules)) {
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
		foreach ($body as $key => $value) {
			if (in_array($key, $model::getAllAttributes())) {
				$params[$key] = $value;
			}
		}

		// creating & storing on DB
		$data = $model->create($params);

		return response()->json([
			NetworkAttributes::STATUS => 'success',
			NetworkAttributes::MESSAGE => 'Punto turístico creado correctamente',
			NetworkAttributes::DATA => $data
		], NetworkAttributes::STATUS_200);
	}

	/**
	 * Updates a touristic point
	 */
	public function update(Request $request)
	{

		// main model to perform DB operations
		$model = TouristicPoint::find($request->id);

		if (!$model) {
			return response()->json([
				NetworkAttributes::STATUS => 'error',
				NetworkAttributes::MESSAGE => 'Punto turístico no encontrado'
			], NetworkAttributes::STATUS_404);
		}

		// validating fields
		if (!$request->validate(TouristicPoint::$validation_rules)) {
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
		foreach ($body as $key => $value) {
			if (in_array($key, TouristicPoint::getAllAttributes())) {
				$params[$key] = $value;
			}
		}

		// updating & storing on DB
		$data = $model->update($params);

		return response()->json([
			NetworkAttributes::STATUS => 'success',
			NetworkAttributes::MESSAGE => 'Punto turístico actualizado correctamente',
			NetworkAttributes::DATA => $data
		], NetworkAttributes::STATUS_200);
	}

	/**
	 * Loads all the touristic points with a reduced set of attributes
	 */
	public function loadTouristicPoints()
	{

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
	public function loadById($id)
	{

		$model = new TouristicPoint();
		$touristicPoint = $model->find($id);

		if (!$touristicPoint) {
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
	public function readMaravillas()
	{
		$model = new TouristicPoint();
		$touristicPoints = $model->where(Attributes::IS_WONDER, '=', true)->get();

		if (!$touristicPoints) {
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
	public function readBySlug(string $slug)
	{
		$model = new TouristicPoint();
		$touristicPoints = $model->where(Attributes::SLUG, '=', $slug)->get();

		if (!$touristicPoints || count($touristicPoints) == 0) {
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
	public function readReservables()
	{
		$model = new TouristicPoint();
		$touristicPoints = $model->where(Attributes::ALLOW_RESERVATION, '=', true)->get();

		if (!$touristicPoints || count($touristicPoints) == 0) {
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
