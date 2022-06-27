<?php

namespace App\Utilities;

use App\Component\Utils;
use App\Enums\Database\Attributes;
use Carbon\Carbon;

class DateUtilities
{
	const HOUR_MILLISECONDS = 3600 * 1000; // 1 hour in milliseconds
	const REST_BETWEEN_SHCEDULES_MILLISECONDS = 15 * 60 * 1000; // 15 minutes
	const MAX_DURATION_OF_SCHEDULES_MILLISECONDS = 120 * 60 * 1000; // 2 hours in milliseconds

	/**
	 * this method will validate all the dates in the specified range (dates) to
	 * meet the requirements of minimun amount of time between each other.
	 *
	 * @param {array} $dates - array of dates to be validated
	 * @return {string} - If an error is found, it will return the error message,
	 * otherwise null will be returned
	 */
	public static function validateMinRangeBetweenDates(array $dates): string|null
	{

		// Only sort if there is more than one date
		if (count($dates) > 1) {
			// sorting the array by start range
			usort($dates, function ($a, $b) {
				return strtotime($a[Attributes::START_RANGE]) - strtotime($b[Attributes::START_RANGE]);
			});
		}

		// validating that the date ranges of every single schedule are valid
		for ($i = 0; $i < count($dates); $i++) {
			// current schedule on the set of schedules
			$schedule = $dates[$i];

			$start_date = $schedule[Attributes::START_RANGE];
			$end_date = $schedule[Attributes::END_RANGE];

			// Validating that the start date and end date correspond to the same day
			// TODO: simplify this
			if(Carbon::parse($start_date)->format('Y-m-d') != Carbon::parse($end_date)->format('Y-m-d')) {
				return 'Las fechas de inicio y fin de las horas de trabajo no corresponden al mismo día';
			}

			// validating that the range is at least one hour. This implicity will also validates
			// that the start date is before the end date
			if ($end_date - $start_date < self::HOUR_MILLISECONDS) {
				return 'El rango de cada horario debe ser de al menos una hora.';
			}

			// Validating the range is not too long
			if ($end_date - $start_date > self::MAX_DURATION_OF_SCHEDULES_MILLISECONDS) {
				return 'El rango de cada horario debe ser de menos de 2 horas.';
			}

			// validating the range is not before the current date
			if ($start_date <= Utils::getCurrentTimestamp()) {
				return 'El rango de cada horario debe ser mayor a la fecha actual.';
			}

			// validating schedules are not overlapping each other & that the next range starts with a proper rest 
			// between the current range and the next range
			if (count($dates) > 1) {
				if ($end_date + self::REST_BETWEEN_SHCEDULES_MILLISECONDS >= $dates[$i + 1][Attributes::START_RANGE]) {
					return 'Los horarios de cada tour no pueden superponerse, y debe haber una pausa de 15 minutos entre ellos.';
				}
			}
		}

		return null;
	}
}
