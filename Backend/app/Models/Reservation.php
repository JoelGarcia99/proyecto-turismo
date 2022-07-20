<?php

namespace App\Models;

use App\Enums\Database\Attributes;
use App\Enums\Database\Collections;

class Reservation extends Base
{
	// statuses
	const STATUS_IN_PROGRESS = 'in_progress';
	const STATUS_REJECTED = 'rejected';
	const STATUS_PENDING = 'pending';
	const APPROVED = 'approved';

	public static function isValidStatus(string $status) {
		return in_array($status, [
			self::STATUS_IN_PROGRESS,
			self::STATUS_PENDING,
			self::STATUS_REJECTED,
			self::APPROVED,
		]);
	}

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
