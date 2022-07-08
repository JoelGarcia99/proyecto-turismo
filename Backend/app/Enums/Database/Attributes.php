<?php

namespace App\Enums\Database;

enum Attributes: string
{
	// Query params
	const IS_MAIN_IMAGE = 'is_main_image';

	// Common
	const ID = '_id';
	const CREATED_AT = 'created_at';
	const UPDATED_AT = 'updated_at';
	const IMAGE_URL = 'image_url';
	const IMAGE = 'image';
	const NAME = 'name';
	const ADDRESS = 'address';
	const DESCRIPTION = 'description';
	const SLUG = 'slug';
	const CATEGORY = 'category';
	const MAIN_IMAGE_URL = 'main_image_url';
	const IS_ACTIVE = 'is_active';

	// Date
	const START_RANGE = 'from';
	const END_RANGE = 'to';

	// Guides
	const SCHEDULE = 'schedule';
	const SCHEDULES = 'schedules';
	const CEDULA = 'cedula';
	const PHONE = 'phone';

	// Touristic point
	const ALLOW_RESERVATION = 'allow_reservation';
	const IS_WONDER = 'is_wonder';
	const SHORT_DESCRIPTION = 'short_description';
	const IMAGES = 'images';

}
