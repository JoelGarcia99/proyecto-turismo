<?php

namespace App\Models;

use App\Enums\Database\Attributes;
use App\Enums\Database\Collections;

class Reservation extends Base
{
	// collection name on MongoDB
	protected $collection = Collections::RESERVATIONS;

	public static $validation_rules = [
		Attributes::DESCRIPTION => 'required|string|max:2000',
		Attributes::POINT=> 'required|string|max:255',
		Attributes::GUIDE=> 'required|string|max:255',
		Attributes::AFORUM => 'required|string|max:255',
	];
}
