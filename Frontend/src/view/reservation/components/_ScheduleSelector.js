import {format} from "date-fns"
import {useEffect} from "react";
import ResponsiveSelect from "../../../components/inputs/responsiveSelect";

const _ScheduleSelector = ({status, setStatus}) => {

	let todaySchedules = [];

	if (status.guide.schedules) {
		todaySchedules = status.guide.schedules.filter(schedule => {
			let a = format(new Date(schedule.from), 'yyyy-MM-dd');
			let b = status.date;

			return a === b;
		});
	}

	useEffect(() => {
		setStatus({
			...status,
			res_schedule: todaySchedules[0]
		});
	}, []);

	if (status.guide) {
		return <div className="flex flex-col">
			{/*TODO: remove this and make it dynamic to fetch the selected guide schedules*/}
			<div>
				<ResponsiveSelect
					title={"Seleccione hora de reserva"}
					data={todaySchedules}
					displayProp={"from"}
					customDisplay={(schedule) => "De " + format(schedule.from, "HH:mm") + " a " + format(schedule.to, "HH:mm")}
					name={"res_schedule"}
				/>
			</div>
		</div>
	}

	else return <></>
}

export default _ScheduleSelector
