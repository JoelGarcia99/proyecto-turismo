import {intlFormat} from "date-fns";


export const getUTCDate = (date) => {
	return intlFormat(
		new Date(date), {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'America/Guayaquil'
	}, {
		locale: 'es',
	}
	);
}
