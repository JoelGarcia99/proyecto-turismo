<?php

namespace App\Enums\Database;

enum DatabaseConfig:string
{
	const HOST = 'DATABASE_HOST';
	const PORT = 'DATABASE_PORT';
	const USER = 'DATABASE_USER';
	const PASS = 'DATABASE_PASS';
	const AUTH = 'DATABASE_AUTH';
	const NAME = 'DATABASE_NAME';

	const AUTHENTICATION_DATABASE = 'DPMS_MONGODB_AUTH';
}
