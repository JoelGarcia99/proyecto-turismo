import { intlFormat } from 'date-fns'
import CustomDatePicker from "../../../components/inputs/CustomDatePicker";

const _DateSelector = ({status, setStatus}) => {

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
		return <div>
			<h1 className="text-xl font-bold px-4 my-4">Horario seleccionado!</h1>
			<div className="flex flex-col items-center justify-center">
				<div className="datepicker relative form-floating mb-3 xl:w-96">
					Tu fecha seleccionada es <strong>{
						intlFormat(
							new Date(status.date), {
								weekday: 'long',
								day: 'numeric',
								month: 'long',
								year: 'numeric'
							}, {
								locale: 'es'
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
		return <>
			<h1 className="text-xl font-bold px-4 my-4">Seleccione un horario</h1>
			<CustomDatePicker value={status.date} onChange={handleChange}/>
		</>;
	}

	return <></>

}

export default _DateSelector
