<?php

namespace App\Enums\Database;

enum Attributes: string
{
	// Query params
	const IS_MAIN_IMAGE = 'is_main_image';
	const IS_TYPICAL_PLATE_IMAGE = 'is_typical_plate_image';
	const POINT_ID = 'point_id';
	const USER_ID = 'user_id';
	const FILTER = 'filter';

	// Reviews
	const REVIEW_SCORE = 'review_score';
	const REVIEW_COMMENT = 'review_comment';
	const AUTHOR_ID = 'author_id';

	// Reservation
	const POINT = 'point';
	const GUIDE = 'guide';
	const AFORUM = 'aforum';
	const RES_SCHEDULE = 'res_schedule';
	const RESERVATION_SCHEDULE = 'schedule';
	const ADMIN_ID = 'admin_id';
	const HISTORY = 'history';

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
	const STATUS = 'status';

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
	const TYPICAL_PLATE = 'typical_plate';
	const TYPICAL_PLATE_DESCRIPTION = 'typical_plate_description';
	const TYPICAL_PLATE_IMAGE_URL = 'typical_plate_image_url';
}
