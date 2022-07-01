<?php

namespace App\Helpers;

use Illuminate\Support\Str;

class FileUploader
{

	const INVALID_EXTENSION_CODE = 1;

	static public $validExtensions = ['jpg', 'jpeg', 'png', 'webp'];

	/**
	 * Uploads an image to the server and returns the path to the image.
	 */
	public static function uploadImage($file, $folder): string | int {
		$extension = $file->getClientOriginalExtension();

		// Validating the extension is allowed.
		if (!in_array($extension, self::$validExtensions)) {
			return self::INVALID_EXTENSION_CODE;
		}

		// Generating a random string as the name of the image
		$fileName = Str::uuid() . '.' . $extension;

		// Uploading the image to the server.
		$file->move($folder, $fileName);

		// buiulding URL
		return $fileName;
	}

	/**
	 * Stores a file in the specified directory.
	 */
	public static function upload($file, $path)
	{
		$fileName = $file->getClientOriginalName();
		$file->move($path, $fileName);

		return $fileName;
	}
}
