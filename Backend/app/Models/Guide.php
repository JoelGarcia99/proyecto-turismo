<?php

namespace App\Models;

use App\Enums\Database\Attributes;
use App\Enums\Database\Collections;

class Guide extends Base
{
	protected $collection = Collections::GUIDES;

	public static $validation_rules = [
		Attributes::NAME => 'required|string|max:255',
		Attributes::IMAGE_URL => '',
		Attributes::IS_ACTIVE => 'boolean',
		Attributes::SCHEDULES => 'array',
		Attributes::CEDULA => 'string|required|max:10|min:10',
		Attributes::PHONE => 'string|required|max:10|min:10',
	];
}
