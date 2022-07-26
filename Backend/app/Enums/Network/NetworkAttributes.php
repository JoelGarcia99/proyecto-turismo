<?php

namespace App\Enums\Network;

enum NetworkAttributes: string
{

	const USER = 'user';
	const ACCESS_TOKEN = 'access_token';
	const STATUS = 'status';
	const MESSAGE = 'message';
	const DATA = 'data';

	const STATUS_200 = '200';
	const STATUS_400 = '400';
	const STATUS_401 = '401';
	const STATUS_403 = '403';
	const STATUS_404 = '404';
	const STATUS_409 = '409';

	const STATUS_ERROR = 'error';
	const STATUS_SUCCESS = 'ok';
}
