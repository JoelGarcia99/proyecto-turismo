import {format} from "date-fns"

const _ScheduleSelector = ({status, setStatus}) => {

	if (status.guide && status.schedule) {

	}

	else if (status.guide) {
		return <>
			<h1 className="text-xl font-bold px-4 my-4">Seleccione la fecha y hora de la reserva</h1>
			{/*TODO: remove this and make it dynamic to fetch the selected guide schedules*/}
			<div>
				{
					status.guide?.schedules.map((schedule, index) => {
						return <div key={index} className="flex flex-row justify-center">
							<div className="flex flex-row justify-center">
								<p className="text-center font-bold uppercase">
									{format(schedule.from, 'p')}
								</p>
								<p className="text-center font-bold uppercase">
									&nbsp; - &nbsp;{format(schedule.to, 'p')}
								</p>
							</div>
						</div>
					})}
			</div>
		</>
	}

	else return <></>
}

export default _ScheduleSelector
