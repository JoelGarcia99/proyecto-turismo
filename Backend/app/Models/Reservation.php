<?php

namespace App\Models;

use App\Enums\Database\Attributes;
use App\Enums\Database\Collections;

class Reservation extends Base
{
	// collection name on MongoDB
	protected $collection = Collections::RESERVATIONS;

	public static $validation_rules = [
		Attributes::DESCRIPTION,
		Attributes::POINT,
		Attributes::GUIDE,
		Attributes::AFORUM
	];
}
