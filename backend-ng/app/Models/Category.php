<?php

namespace App\Models;

use App\Enums\Database\Attributes;
use App\Enums\Database\Collections;

class Category extends Base
{
	protected $collection = Collections::CATEGORIES;

	static public $validation_rules = [
		Attributes::NAME => 'required|max:50',
		Attributes::DESCRIPTION => 'required|max:100',
	];
}
