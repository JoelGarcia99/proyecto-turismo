<?php

namespace App\Enums\Network;

enum NetworkAttributes: string
{
	const STATUS = 'status';
	const MESSAGE = 'message';
	const DATA = 'data';

	const STATUS_200 = '200';
	const STATUS_400 = '400';

	const STATUS_ERROR = 'error';
	const STATUS_OK = 'ok';
}
