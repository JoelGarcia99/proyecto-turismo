import {faClock} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { format, intlFormat } from 'date-fns'
import {useState} from 'react';
import CustomDatePicker from "../../../components/inputs/CustomDatePicker";

const _DateSelector = ({status, setStatus}) => {

	// using current date by default
	const [date, setDate] = useState(format(Date.now(), 'MM/dd/yyyy'));

	const handleChange = (date) => {
		setStatus({
			...status,
			date
		});
	}

	const handleDateDeletion = ()=>{
		setStatus({
			point: status.point
		});
	}

	if (status.point && status.date) {
		return <div className="flex flex-col items-center">
			<h1 className="text-xl font-bold px-4 my-4">Horario seleccionado!</h1>
			<div className='flex flex-col items-center border-1 shadow py-2 px-2 mx-2 rounded-xl border-blue-200'>
				<FontAwesomeIcon
					className="text-gray-400 text-5xl"
					icon={faClock}
				/>
				<div className="datepicker relative form-floating mb-3 xl:w-96">
					Tu fecha seleccionada es <strong>{
						intlFormat(
							new Date(status.date), {
								weekday: 'long',
								day: 'numeric',
								month: 'long',
								year: 'numeric',
								timeZone: 'Europe/Madrid'
							}, {
								locale: 'es',
							}
						)
					}</strong>
				</div>

				<button
					className="rounded mx-auto border-blue-500 border-solid border-2 px-4 py-2 text-blue-500 uppercase hover:bg-blue-500 hover:text-white"
					onClick={handleDateDeletion}
				>
					Descartar
				</button>
			</div>
		</div>;
	}

	else if (status.point) {
		return <div className="flex flex-col my-4">
			<h1 className="text-xl font-bold px-4 my-4">Seleccione un horario</h1>
			<div className='flex flex-col items-center border-1 shadow py-2 px-2 mx-2 rounded-xl border-blue-200'>
			<CustomDatePicker value={date} onChange={setDate}/>

				<button
					className="rounded mx-auto border-blue-500 border-solid border-2 px-4 py-2 text-blue-500 uppercase hover:bg-blue-500 hover:text-white"
					onClick={()=>handleChange(date)}
				>
					Seleccionar
				</button>
			</div>
		</div>;
	}

	return <></>

}

export default _DateSelector
