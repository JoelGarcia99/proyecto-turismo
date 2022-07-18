import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import {faCircle, faCircleDot, faComment} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router';
import SquareLoader from '../../../components/loader/SquareLoader';
import {getUTCDate} from '../../../helpers/helper.date';
import {customHTTPRequest} from '../../../helpers/helper.network';
import Sidebar from '../../../modules/admin_dashboard/components/Sidebar';
import {allRoutes} from '../../../router/routes';

import 'react-vertical-timeline-component/style.min.css';
import CustomTextArea from '../../../components/inputs/CustomTextArea';
import ResponsiveSelect from '../../../components/inputs/responsiveSelect';

const statuses = {
	'pending': 'Pendiente',
	'assigned_to_me': 'Asignado a mí',
	'unattended': 'Sin atender',
	'approved': 'Aprobado',
}

const ManageReservationsUpdate = () => {

	// fetching data for this location
	const [reservation, setReservation] = useState(null);
	const dispatch = useDispatch();
	const [newComment, setNewComment] = useState('');
	const {token} = useSelector(state => state.auth);

	const statusColorFormat = (status) => {
		switch (status) {
			case 'pending':
				return 'bg-yellow-500';
			case 'assigned_to_me':
				return 'bg-blue-500';
			case 'unattended':
				return 'bg-orange-900';
			case 'approved':
				return 'bg-teal-500';
			default:
				return 'bg-gray-500';
		}
	}

	const statusTextFormat = (status) => {
		switch (status) {
			case 'pending':
				return 'text-black';
			case 'assigned_to_me':
				return 'text-white';
			case 'unattended':
				return 'text-white';
			case 'approved':
				return 'text-white';
			default:
				return 'text-black';
		}
	}
	// this comes from URL params
	const {id} = useParams();

	useEffect(async () => {
		const url = `${process.env.REACT_APP_NG_API_HOST}/api/manage/reservation/${id}`;

		// fetching all the data corresponding to the current reservation
		const response = await customHTTPRequest(dispatch, url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}, false);

		// setting the reservation data
		setReservation(response.data);
	}, []);

	return <div className="max-h-full bg-slate-100">
		<Sidebar
			title="Detalles de la reserva"
			activeRoute={allRoutes.manage_reservation}
		/>
		<div className="md:ml-64 w-100 py-5 px-10 bg-slate-100 flex-1">
			{
				!reservation &&
				<SquareLoader />
			}
			{
				reservation &&
				<div
					id="content"
					className="flex flex-col justify-start items-center w-full"
				>
					{/* Header */}
					<div className="w-full flex flex-row justify-between items-center px-2 py-2">
						<div id="user-data" className="w-full flex flex-col justify-start items-start">
							<span id="author" className="font-bold text-lg uppercase"> {reservation.author?.name} </span>
							<span id="point" className="flex flex-row items-center font-light text-sm uppercase text-gray-600">
								<span className="font-bold"> {reservation.point?.name} </span>
								&nbsp;
								<FontAwesomeIcon style={{fontSize: "0.3rem"}} icon={faCircle} />
								&nbsp;
								<span className="font-normal"> {reservation.guide?.name} </span>
							</span>
						</div>

						<div id="status" className="mx-4">
							<ResponsiveSelect
								title={"Estado de la reserva"}
								className={
									"font-bold " + statusColorFormat(reservation.status) +
									" " + statusTextFormat(reservation.status)
								}
								name="status"
								data={Object.keys(statuses)}
								initVal={reservation.status}
								formater={(value) => statuses[value]}
								setData={(value) => {
									setReservation({...reservation, status: value.target.value});
								}}
							/>
						</div>
					</div>
					<hr />
					{/* Author's comment */}
					<div id="description" className="container shadow-md rounded-md px-4 py-6">
						{reservation.description}
					</div>
					{/* Admin comment */}
					<div id="description" className="container shadow-md rounded-md px-4 py-6">
						<h2 className="text-md font-bold">Comentario del administrador</h2>
						<CustomTextArea
							title=""
							name="comment"
							placeholder="Ingrese su comentario"
							value={newComment}
							setValue={setNewComment}
						/>
						<button className="px-4 py-1 bg-blue-500 text-white font-bold shadow hover:shadow-lg rounded-md float-right">
							Comentar
						</button>
					</div>
					<h1 id="timeline-cap" className="my-6 text-lg font-bold uppercase float-left">Linea de tiempo</h1>
					<VerticalTimeline lineColor='rgb(22 163 74)'>
						{
							reservation.history?.reverse()?.map((history, index) => {
								return <VerticalTimelineElement
									key={index}
									className="vertical-timeline-element--work"
									contentStyle={{background: 'rgb(49 46 129)', color: '#fff'}}
									contentArrowStyle={{borderRight: '7px solid  rgb(49 46 129)'}}
									iconStyle={{background: 'rgb(33, 150, 243)', color: 'fff'}}
									icon={<FontAwesomeIcon icon={faComment} className="text-white"/>}
								>
									{history.start_message ?? history.admin_message}
								</VerticalTimelineElement>
							})
						}
					</VerticalTimeline>
				</div>

			}
		</div>
	</div>;
}

export default ManageReservationsUpdate;
