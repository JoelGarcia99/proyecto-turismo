<?php

namespace App\Helpers;

use Illuminate\Support\Str;

class FileUploader
{
	static private $validExtensions = ['jpg', 'jpeg', 'png', 'webp'];

	/**
	 * Uploads an image to the server and returns the path to the image.
	 */
	public static function uploadImage($file, $folder): string | null {
		$extension = $file->getClientOriginalExtension();

		// Validating the extension is allowed.
		if (!in_array($extension, self::$validExtensions)) {
			return null;
		}

		// Generating a random string as the name of the image
		$fileName = Str::uuid() . '.' . $extension;

		// Uploading the image to the server.
		$file->move($folder, $fileName);

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
