<?php

namespace App\Enums\Database;

enum Collections: string
{
	const TOURISTIC_POINTS = 'portoturismo.touristic_points';
	const CATEGORIES = 'portoturismo.categories';
	const GUIDES = 'portoturismo.guides';
	const RESERVATIONS = 'portoturismo.reservations';
	const REVIEWS = 'portoturismo.reviews';
	const USERS = 'portoturismo.users';
}
