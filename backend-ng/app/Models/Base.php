<?php

namespace App\Models;

use App\Enums\Database\Attributes;
use Jenssegers\Mongodb\Eloquent\Model;

abstract class Base extends Model
{

	protected $collection;
	protected $connection = 'mongodb';

	protected $guarded = [
		Attributes::ID,
		Attributes::CREATED_AT,
		Attributes::UPDATED_AT,
	];

	/**
	 * here you're gonna define the schema as well
	 */
	static public $validation_rules = [];

	/**
	 * Gets all the fields of the model in a string array
	 */
	public static function getAllAttributes():array {
		return array_keys(static::$validation_rules);
	}

    /**
     * Custom `created_at` attribute mutator to allow saving on standardized timestamp format.
     * @param mixed $value current `created_at` value that should be a [[Carbon]] instance.
     */
    public function setCreatedAtAttribute($value)
    {
        // Writing `created_at` attribute
        $this->attributes[static::CREATED_AT] = $value;
    }

    /**
     * Custom `updated_at` attribute mutator to allow saving on standardized timestamp format.
     * @param mixed $value current `updated_at` value that should be a [[Carbon]] instance.
     */
    public function setUpdatedAtAttribute($value)
    {
        $this->attributes[static::UPDATED_AT] = $value;
    }
}
