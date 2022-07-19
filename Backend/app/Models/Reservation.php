<?php

namespace App\Models;

use App\Enums\Database\Attributes;
use App\Enums\Database\Collections;

class Reservation extends Base
{
	// statuses
	const STATUS_UNATTENDED = 'unattended';
	const STATUS_IN_PROGRESS = 'in_progress';
	const STATUS_PENDING = 'pending';
	const ASSIGNED_TO_ME = 'assigned_to_me';
	const APPROVED = 'approved';

	// collection name on MongoDB
	protected $collection = Collections::RESERVATIONS;

	public static $validation_rules = [
		Attributes::DESCRIPTION => 'required|string|max:2000',
		Attributes::POINT=> 'required|string|max:255',
		Attributes::GUIDE=> 'required|string|max:255',
		Attributes::AFORUM => 'required|string|max:255',
		Attributes::AUTHOR_ID => 'string|max:255',
		Attributes::ADMIN_ID => 'string|max:255',
		Attributes::STATUS => 'string|max:255',
		Attributes::RESERVATION_SCHEDULE => 'required',
	];
}
