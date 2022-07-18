import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, NavLink} from 'react-router-dom';
import {faAdd, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {startFetchingAllTP} from '../../../redux/actions/locations/action.location';
import {allRoutes} from '../../../router/routes';
import Sidebar from '../../../modules/admin_dashboard/components/Sidebar';
import QuickAccess from '../../../modules/admin_dashboard/components/QuickAccess';
import ResponsiveSelect from '../../../components/inputs/responsiveSelect';
import {customHTTPRequest} from '../../../helpers/helper.network';
import SpinLoader from '../../../components/loader/SpinLoader';
import NoData from '../../../components/feedback/NoData';
import {getUTCDate} from '../../../helpers/helper.date';

const filters = {
	assigned_to_me: "Asignado a mi",
	pending: "Pendiente",
	approved: "Aprobado",
};

const processFilter = (selectedFilter) => {

	switch (selectedFilter) {
		case filters.assigned_to_me: return "assigned_to_me";
		case filters.pending: return "pending";
		case filters.approved: return "approved";
		default: return selectedFilter;
	}
}

// Url to filter the reservations
const url = `${process.env.REACT_APP_NG_API_HOST}/api/manage/reservations/`;

const ManageReservationsIndex = () => {

	const dispatch = useDispatch();

	const [data, setData] = useState(null);
	const [loader, setLoader] = useState(true); // shows a spinner while fetching data
	const [filter, setFilter] = useState(filters.assigned_to_me);
	const {token} = useSelector(state => state.auth);

	useEffect(async () => {
		// It's necessary to process the url to use a code as a filter instead of a human
		// readable string
		const targetUrl = `${url}${processFilter(filter)}`;

		// This will return all the reservations or an empty array if there are no reservations
		// for the current admin or that does not have any admin assigned
		const response = await customHTTPRequest(dispatch, targetUrl, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		// Stoping the spinner (loader)
		setLoader(false);

		// updating the data on the state
		setData(response);
	}, [dispatch, filter]); // every time the filter changes the data will be updated

	const handleFilterChange = (e) => {
		setLoader(true); // showing a spinner while fetching data
		setFilter(e.target.value);
	}


	return <div className="max-h-full bg-slate-100">
		<Sidebar title="Control de reservas" activeRoute={allRoutes.manage_reservation} />
		<div className="md:ml-64 w-100 py-5 px-10 bg-slate-100 flex-1">
			<h1 className="text-xl font-bold text-center py-2 px-2 mx-auto uppercase">
				Control de reservas
			</h1>
			{/* <h3>Acceso rápido</h3> */}
			{/* <div id="quick-access" className="flex flex-row justify-center items-center flex-1 my-4"> */}
			{/* 	<QuickAccess title="Nueva" value="34" color="bg-rose-800" foreground="text-white" /> */}
			{/* 	<QuickAccess title="Rechazadas" value="4" color="bg-red-700" foreground="text-white" /> */}
			{/* 	<QuickAccess title="Aprobadas" value="17" color="bg-yellow-500" foreground="text-black" /> */}
			{/* 	<QuickAccess title="Expiradas" value="3" color="bg-green-900" foreground="text-white" /> */}
			{/* </div> */}
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left px-4 text-gray-500">
					<caption className="px-6 w-full text-xl my-4">
						<div className="flex flex-row items-center justify-between">
							<div>{filters[filter]}</div>
							<div>
								<ResponsiveSelect
									name={"filter"}
									setData={(e) => handleFilterChange(e)}
									data={Object.keys(filters)}
									formater={e => filters[e]}
								/>
							</div>
						</div>
					</caption>
					<thead className="text-xs text-gray-700 uppercase bg-gray-50">
						<tr>
							<th scope="col" className="px-6 py-3">
								Creado por
							</th>
							<th scope="col" className="px-6 py-3">
								Punto turístico
							</th>
							<th scope="col" className="px-6 py-3">
								Guia asignado
							</th>
							<th scope="col" className="px-6 py-3">
								Fecha
							</th>
						</tr>
					</thead>
					<tbody className="w-full mx-auto">
						{
							data &&
							data.map((reservation) => {
								return <tr key={reservation._id} className="bg-white border-b ">
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
									>{reservation.author?.name || "N/A"}</th>
									<td className="px-6 py-4">{reservation.point?.name || "N/A"}</td>
									<td className="px-6 py-4">{reservation.guide?.name || "N/A"}</td>
									<td className="px-6 py-4">{getUTCDate(reservation.updated_at)}</td>
									<td className="px-6 py-4">
										<Link
											to={`${allRoutes.manage_reservation_update}${reservation._id}`}
										>
											<FontAwesomeIcon icon={faInfoCircle} />&nbsp;Ver detalles
										</Link>
									</td>
								</tr>
							})
						}
					</tbody>
				</table>
				{
					(loader || !data) &&
					<div style={{width: "100% !important", margin: "auto", padding: "3rem 2rem"}}>
						<SpinLoader />
					</div>
				}
				{
					!loader && data && data.length === 0 &&
					<div className='my-8 mx-auto flex flex-row justify-center'>
						<NoData text="No hay reservas aun" />
					</div>
				}
			</div>
		</div>
	</div>
};

export default ManageReservationsIndex;

