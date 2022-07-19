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
import SpinLoader from '../../../components/loader/SpinLoader';
import {ToastContainer} from 'react-toastify';

const statuses = {
	'in_progress': 'En progreso',
	'rejected': 'Rechazado',
	'approved': 'Aprobado',
}

const ManageReservationsUpdate = () => {

	// fetching data for this location
	const dispatch = useDispatch();
	const [reservation, setReservation] = useState(null);
	const [newComment, setNewComment] = useState('');
	const {token} = useSelector(state => state.auth);
	const {user} = useSelector(state => state.auth);

	const [loadingState, setLoadingState] = useState(false);

	const historyLogs = [...(reservation?.history ?? [])];

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

	// only when the user adds a new comment
	const handleAddingComment = async () => {
		const url = `${process.env.REACT_APP_NG_API_HOST}/api/manage/reservation/comment`;

		// sending the comment to the server
		const response = await customHTTPRequest(dispatch, url, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				reservation_id: id,
				comment: newComment,
				user_id: user.id,
			}),
		}, true);

		if(response !== {}) {
			setReservation({
				...reservation,
				history: response.data.history ?? reservation.history
			});
			setNewComment("");
		}
	}

	// assigning the reservation to the current admin
	const handleAssigningReservation = async () => {
		const url = `${process.env.REACT_APP_NG_API_HOST}/api/manage/reservation/assign-to-me`;

		const response = await customHTTPRequest(dispatch, url, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				admin_id: user.id,
				reservation_id: reservation._id,
			}),
		}, true);

		if(response !== {}) {
			window.location.reload();
		}
	}

	return <div className="max-h-full bg-slate-100">
		<Sidebar
			title="Detalles de la reserva"
			activeRoute={allRoutes.manage_reservation}
		/>
		<div className="md:ml-64 w-100 py-5 px-10 bg-slate-100 flex-1">
			<ToastContainer />
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
							{
								reservation.admin?.name &&
								<small className="text-sm font-normal">
									En revision por {reservation.admin.id == user.id ? "ti" : reservation.admin.name}
								</small>
							}
						</div>
						{
							!reservation.admin &&
							<button 
								className="w-max text-white font-bold px-2 py-1 rounded-md shadow-md bg-blue-500"
								onClick={handleAssigningReservation}
							>
								Asignarme reserva
							</button>
						}
						{
							reservation.admin &&
							<div id="status" className="mx-4">
								{
									loadingState && <SpinLoader /> ||
									<ResponsiveSelect
										title={"Estado de la reserva"}
										className={"font-bold"}
										name="status"
										data={Object.keys(statuses)}
										initVal={reservation.status}
										formater={(value) => statuses[value]}
										setData={(value) => {
											// updating current node
											setReservation({...reservation, status: value.target.value});
										}}
									/>
								}
							</div>
						}
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
							onChange={(e)=>setNewComment(e.target.value)}
						/>
						<button 
							className="px-4 py-1 bg-blue-500 text-white font-bold shadow hover:shadow-lg rounded-md float-right"
							onClick={handleAddingComment}
						>
							Comentar
						</button>
					</div>
					<h1 id="timeline-cap" className="my-6 text-lg font-bold uppercase float-left">Linea de tiempo</h1>
					<VerticalTimeline lineColor='rgb(22 163 74)'>
						{
							historyLogs?.reverse()?.map((history, index) => {
								return <VerticalTimelineElement
									key={index}
									className="vertical-timeline-element--work"
									contentStyle={{
										background: history.role === "admin"? 'rgb(185 28 28)' : 'rgb(49 46 129)',
										color: '#fff'
									}}
									contentArrowStyle={{
										borderRight: `7px solid  ${!history.role === "admin"? "rgb(49 46 129)" : "rgb(185 28 28)"}`
									}}
									iconStyle={{background: 'rgb(33, 150, 243)', color: 'fff'}}
									icon={<FontAwesomeIcon icon={faComment} className="text-white" />}
								>
									<h1 className="font-bold">
										{(history.role === 'admin'? "(Admin) ":"") + history.user_name}
										&nbsp;ha comentado
									</h1>
									<span>
										{history.comment}
									</span>
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
