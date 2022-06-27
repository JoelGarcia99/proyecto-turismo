<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use App\Enums\Database\Attributes;
use App\Enums\Database\Collections;

class TouristicPoint extends Base
{
	use Sluggable;

	protected $collection = Collections::TOURISTIC_POINTS;

	protected $guarded = [
		Attributes::ID
	];

	static public $validation_rules = [
		Attributes::NAME => 'required|string|max:255',
		Attributes::DESCRIPTION => 'string|max:3000',
		Attributes::SHORT_DESCRIPTION => 'string|max:500',
		Attributes::ADDRESS => 'string|max:255',
		Attributes::CATEGORY => 'string',
		Attributes::IS_WONDER => 'boolean',
		Attributes::MAIN_IMAGE_URL => 'string|max:255',
		Attributes::ALLOW_RESERVATION => 'boolean'
	];

	/**
	 * Returns a string array of all the attribute names of this model
	 */
	public static function getAllAttributes():array{
		return array_keys(self::$validation_rules);
	}

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => Attributes::NAME
            ]
        ];
    }
}
