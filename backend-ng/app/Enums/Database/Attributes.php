<?php

namespace App\Enums\Database;

enum Attributes: string
{
	const ID = '_id';
	const CREATED_AT = 'created_at';
	const UPDATED_AT = 'updated_at';
	const NAME = 'name';
	const ADDRESS = 'address';
	const DESCRIPTION = 'description';
	const SLUG = 'slug';
	const CATEGORY = 'category';
	const MAIN_IMAGE_URL = 'main_image_url';

	// Touristic point
	const ALLOW_RESERVATION = 'allow_reservation';
	const IS_WONDER = 'is_wonder';
	const SHORT_DESCRIPTION = 'short_description';

}
