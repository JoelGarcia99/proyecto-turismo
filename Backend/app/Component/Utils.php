<?php

namespace App\Component;

use Carbon\Carbon;

class Utils {
	    /**
     * Gets the value of an environment variable. Function will check first for system-level variables by
     * calling PHP [[getenv]] function, if variable requested is not defined, it will call Laravel global
     * helper function [[env]].
     * @param string $key name of the variable requested
     * @param mixed $default default value that will be provided to [[env]] function.
     * @return mixed value of the variable if defined, default if not.
     */
    public static function getEnv(string $key, $default = null)
    {
        // Attempting to get from [[getenv]]
        $value = getenv($key);
        // Checking if variable is defined
        if ($value !== false) {
            // Returning get value
            return $value;
        }

        // Returning default Laravel [[env]] call
        return env($key, $default);
    }

	/**
	 * Returns a 13 digits timestamp of the current time.
	 *
	 * @param string $addMinutes minutes to be added to the current time
	 * @return int
	 */
	public static function getCurrentTimestamp(int $addSeconds = 0)
	{
		$curr_date = Carbon::now();
		return $curr_date->addSeconds($addSeconds)->valueOf();
	}

	public static function parseToTimestamp($value):int {
        // Instantiating value to parse
        $timestamp = Carbon::parse($value);
        // Setting value has timestamp
        $timestamp = $timestamp->valueOf();

		return intval($timestamp);
	}

	/**
	 * Get a range of dates in a 13 digits timestamp format
	 *
	 * @param int $daysBefore The number of days before the current date
	 * @param int $daysAfter The number of days after the current date
	 * @return array
	 */
	public static function getTimestampRange(int $daysBefore, int $daysAfter)
	{
		$curr_date = Carbon::now();
		$start_date = $curr_date->subDays($daysBefore)->valueOf();
		$end_date = $curr_date->addDays($daysAfter)->valueOf();
		return [$start_date, $end_date];
	}
}
