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

const filters = {
	assigned_to_me: "Asignado a mi",
	pending: "Pendiente",
	approved: "Aprobado",
};

const ManageReservationsIndex = () => {

	const dispatch = useDispatch();
	const {locations} = useSelector(state => state.locations);

	const [filter, setFilter] = useState(filters.assigned_to_me);

	useEffect(() => {
		dispatch(startFetchingAllTP());
	}, [dispatch]);


	return <div className="max-h-full bg-slate-100">
		<Sidebar title="Control de reservas" activeRoute={allRoutes.manage_reservation} />
		<div className="md:ml-64 w-100 py-5 px-10 bg-slate-100 flex-1">
			<h3>Acceso rápido</h3>
			<div id="quick-access" className="flex flex-row justify-center items-center flex-1 my-4">
				<QuickAccess title="Nueva" value="34" color="bg-rose-800" foreground="text-white"/>
				<QuickAccess title="Rechazadas" value="4" color="bg-red-700" foreground="text-white"/>
				<QuickAccess title="Aprobadas" value="17" color="bg-yellow-500" foreground="text-black"/>
				<QuickAccess title="Expiradas" value="3" color="bg-green-900" foreground="text-white"/>
			</div>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left px-4 text-gray-500">
					<caption className="px-6 w-full text-xl my-4">
						<div className="flex flex-row items-center justify-between">
						<div>{filters[filter]}</div>
						<div>
							<ResponsiveSelect
								name={"filter"}
								setData={(e)=>setFilter(e.target.value)}
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
								Fecha de creación
							</th>
							<th scope="col" className="px-6 py-3">
								Ultima actualización
							</th>
							<th className="px-6 py-3" scope="col">Aforo</th>
							<th scope="col" className="px-6 py-3">
								<span className="sr-only">Horario</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{
							locations.map((loc) => {
								return <tr key={loc._id} className="bg-white border-b ">
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
									>{loc.name || "N/A"}</th>
									<td className="px-6 py-4">{loc.address || "N/A"}</td>
									<td className="px-6 py-4">{Number(loc.allow_reservation) === 1 ? "Sí" : "No"}</td>
									<td className="px-6 py-4">{Number(loc.is_maravilla) === 1 ? "Sí" : "No"}</td>
									<td className="px-6 py-4">{loc.category || "N/A"}</td>
									<td className="px-6 py-4">
										<Link
											to={`${allRoutes.manage_puntoturis_edit}${loc._id}`}
										>
											<FontAwesomeIcon icon={faInfoCircle} />&nbsp;Ver detalles
		      </Link>
									</td>
								</tr>
							})
						}
					</tbody>
				</table>
			</div>
		</div>
	</div>
};

export default ManageReservationsIndex;

