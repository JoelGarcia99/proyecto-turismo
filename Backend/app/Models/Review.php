<?php

namespace App\Models;

use App\Enums\Database\Attributes;
use App\Enums\Database\Collections;

class Review extends Base
{
	// collection name on MongoDB
	protected $collection = Collections::REVIEWS;

	public static $validation_rules = [
		Attributes::REVIEW_SCORE => 'required|numeric|between:1,5',
		Attributes::REVIEW_COMMENT => 'string|max:3000',
		Attributes::AUTHOR_ID => 'required|string|max:255',
		Attributes::POINT_ID => 'required|string|max:255',
	];
}
