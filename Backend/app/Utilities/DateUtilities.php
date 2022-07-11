<?php

namespace App\Utilities;

use App\Component\Utils;
use App\Enums\Database\Attributes;
use Carbon\Carbon;

class DateUtilities
{
	const HOUR_MILLISECONDS = 3600 * 1000; // 1 hour in milliseconds
	const QUARTER_TO_HOUR_MILLISECONDS = 45 * 60 * 1000; // 45 minutes in milliseconds
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
				return strtotime($b[Attributes::START_RANGE]) - strtotime($a[Attributes::START_RANGE]);
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
			// if(Carbon::parse($start_date)->format('Y-m-d') != Carbon::parse($end_date)->format('Y-m-d')) {
			// 	return 'Las fechas de inicio y fin de las horas de trabajo no corresponden al mismo día';
			// }

			// validating that the range is at least one hour. This implicity will also validates
			// that the start date is before the end date
			if ($end_date - $start_date < self::QUARTER_TO_HOUR_MILLISECONDS) {
				return 'El rango de cada horario debe ser de al menos 45 minutos.';
			}

			// Validating the range is not too long
			if ($end_date - $start_date > self::MAX_DURATION_OF_SCHEDULES_MILLISECONDS) {
				return 'El rango de cada horario debe ser de menos de 2 horas.';
			}

			// validating the range is not before the current date
			if ($start_date <= Utils::getCurrentTimestamp()) {
				return 'El rango de cada horario debe ser mayor a la fecha actual.';
			}

			// validating end date is after start date 
			if ($end_date < $start_date) {
				return 'La fecha de fin de cada horario debe ser mayor a la fecha de inicio.';
			}

			// validating schedules are not overlapping each other & that the next range starts with a proper rest 
			// between the current range and the next range
			if (count($dates) > 1 && $i < count($dates) - 1) {
				if ($end_date + self::REST_BETWEEN_SHCEDULES_MILLISECONDS >= $dates[$i + 1][Attributes::START_RANGE]) {
					$a = self::parseFomr13digitsTimestampTo10digits($end_date);
					$b = self::parseFomr13digitsTimestampTo10digits($dates[$i + 1][Attributes::START_RANGE]);

					// substracting 6hrs to $a and $b
					// TODO: test it
					$a -= 5 * self::HOUR_MILLISECONDS / 1000;
					$b -= 5 * self::HOUR_MILLISECONDS / 1000;

					// parsing $a to human readable format
					$a = Carbon::createFromTimestamp($a)->format('Y-m-d H:i');

					$baseMessage = 'Los horarios de cada tour no pueden superponerse, y debe haber una pausa de 15 minutos entre ellos. ';
					$specific = 'Uno de tus horarios termina el '.$a.' y el siguiente comienza a las '.Carbon::parse($b)->format('d-m-y H:i:s');

					return $baseMessage.$specific;
				}
			}
		}

		return null;
	}


	public static function compareOnlyDate(string $date1, string $date2): int
	{
		$date1 = Carbon::parse($date1);
		$date2 = Carbon::parse($date2);

		return $date1->diffInDays($date2);
	}

	public static function parseTimestampToDate(int $timestamp): string
	{
		return Carbon::createFromTimestamp($timestamp / 1000)->format('Y-m-d');
	}

	public static function parseFomr13digitsTimestampTo10digits(int $timestamp): int
	{
		return floor($timestamp / 1000);
	}
}
