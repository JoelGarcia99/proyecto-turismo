
import {format} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import Comments from '../../components/comments/Comments';
import SessionHeaderComponent from '../../components/header/sessionHeaderComponent';
import CustomSelect from '../../components/inputs/CustomSelect';
import useCustomForm from '../../hooks/useCustomForm';
import {startFetchingGuidesByPoint} from '../../redux/actions/guideman/action.guideman';
import {startFetchingReservables} from '../../redux/actions/locations/action.location';
import {startSavingReservation} from '../../redux/actions/reservations/action.reservation';
import {allRoutes} from '../../router/routes';
import _Header from './_Header';

const Reservation = ({isUpdate= false}) => {

	const dispatch = useDispatch();
	const {guidemen: guides} = useSelector(state => state.guideman);
	const {reservables} = useSelector(state => state.locations);

	const [selectedGuide, setSelectedGuide] = useState(null);
	const [selectedSchedule, setSelectedSchedule] = useState(null);
	const [selectedPoint, setSelectedPoint] = useState(null);

	const navigator = useNavigate();

	const [params, setParams] = useCustomForm({
		state: 'state_draft',
		title: '',
		description: '',
		aforum: 15
	});

	// fetching guides
	useEffect(()=>{
		dispatch(startFetchingReservables((points)=>{
			dispatch(startFetchingGuidesByPoint(points[0]._id, (guides)=>{
				setSelectedGuide(guides[0]);
				setSelectedSchedule(guides[0]?.schedules[0]);
			}));
		}));
	}, [dispatch]);

	const handleSave = (event)=>{
		event.preventDefault();

		const body = {
			...params,
			guide: {
				_id: selectedGuide._id,
				name: selectedGuide.name,
			},
			schedule: selectedSchedule,
			touristic_point: {
				_id: selectedPoint._id,
				name: selectedPoint.name,
			}
		}

		//TODO: show a loader here
		dispatch(startSavingReservation(body, ()=>{
			//TODO: redirect to the reservation page instead of home
			navigator(allRoutes.home);
			//TODO: quit loader here
		}));
	}

	return (
		<div className="mx-auto flex flex-col items-center">
			<SessionHeaderComponent 
				currentRoute={allRoutes.reservation} 
			/>
			<_Header 
				isActive={!!selectedPoint && !!selectedGuide && !!selectedSchedule }
				onSave={handleSave}
			/>
			<hr />
			<input
				type="text"
				className="w-2/3 border-none shadow focus:outline-0 active:outline-0 outline-0 mx-auto px-6"
				placeholder="Escriba aqui un titulo"
				name="title"
				value={params.title}
				onChange={setParams}
			/>
			<br />
			<textarea
				className="w-2/3 border-none shadow focus:outline-0 active:outline-0 outline-0 mx-auto px-6"
				style={{resize: "none", height: "50vh"}}
				placeholder="Escriba aqui una descripcion"
				name="description"
				value={params.description}
				onChange={setParams}
			/>
			<div id="touris-selector" className="w-full flex flex-row flex-wrap items-center w-2/3">
				{
					reservables.length === 0?
				    "No hay puntos para reservar"
					:<CustomSelect
						data={reservables}
						selectedIndex={0}
						label="Seleccione un punto"
						value={selectedPoint ?? reservables[0]}
						onChange={(selected)=>{
							setSelectedPoint(selected);
							dispatch(startFetchingGuidesByPoint(selected._id, (guides)=>{
								setSelectedGuide(guides[0]);
								setSelectedSchedule(guides[0]?.schedules[0]);
							}));
						}}
						format={(point)=>point.name}
					/>
				}
			</div>
			<div 
				id="guide-selector"
				className="w-full flex flex-row flex-wrap justify-evenly items-center w-2/3"
			>
				<div
					className="sm:w-2/5 px-2 py-1 rounded"
				>
					{
						guides?.length === 0 ?
							"No hay guias ahora"
							:<CustomSelect 
								data={guides}
								selectedIndex={0}
								label="Seleccione guia" 
								value={selectedGuide ?? guides[0]}
								onChange={(value)=>{setSelectedGuide(value); setSelectedSchedule(value.schedules[0])}}
								format={(item) => `${item.name}`}
							/>
					}
				</div>
				<div
					className="sm:w-2/5 px-2 py-1 rounded"
				>
					{
						!selectedGuide ?
						"No hay ningun guia seleccionado"
						:<CustomSelect 
							data={selectedGuide?.schedules ?? []}
							selectedIndex={0}
							label="Seleccione horario" 
							format={(item) => `${format(new Date(item?.from), 'MMM dd, yyyy hh:mm aaa')} - ${format(new Date(item?.to), 'MM dd, yyyy hh:mm aaa')}`}
							value={selectedSchedule ?? selectedGuide?.schedules[0]}
							onChange={setSelectedSchedule}
						/>
					}
				</div>
			</div>
			<div id="aforo">
				<label htmlFor="">Ingrese aforo</label>
				<input 
					value={params.aforum}
					type="number"
					min={15}
					max={50}
					name="aforum"
					onChange={setParams}
				/>

			</div>
			<Comments 
				collection="reservations"
			/>
		</div>
	);
}

export default Reservation;
