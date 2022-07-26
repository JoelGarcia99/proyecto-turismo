<?php

namespace App\Models;

use App\Enums\Database\Collections;

class User extends Base 
{

	protected $collection = Collections::USERS;

	static public $validation_rules = [
		'name' => 'required|string|max:255',
		'email' => 'required|string|email|max:255|unique:'.Collections::USERS,
		'password' => 'required|string|min:6|confirmed',
		'token' => 'required|string|max:60',
	];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];
}
