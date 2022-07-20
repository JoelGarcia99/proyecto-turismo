import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {faAdd, faInfoCircle, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {startDeletingPunto, startFetchingAllTP} from '../../../redux/actions/locations/action.location';
import {allRoutes} from '../../../router/routes';
import Sidebar from '../../../modules/admin_dashboard/components/Sidebar';
import {ToastContainer} from 'react-toastify';

const ManagePuntoturisIndex = () => {

	const dispatch = useDispatch();
	const {locations} = useSelector(state => state.locations);
	const [shouldReload, setShouldReload] = useState(false);

	useEffect(() => {
		dispatch(startFetchingAllTP());
	}, [dispatch, shouldReload]);

	// Permanently removes this touristic point from DB
	const handleDelete = (id) => {
		dispatch(startDeletingPunto(id, () => {
			setShouldReload(!shouldReload);
		}));
	}


	return <div className="max-h-full bg-slate-100">
		<ToastContainer />
		<Sidebar title="Gestión puntos turísticos" activeRoute={allRoutes.manage_puntoturis} />
		<div className="md:ml-64 w-100 py-5 px-10 bg-slate-100 flex-1">
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left px-4 text-gray-500">
					<caption className="w-full text-xl my-4">
						<div>Mostrando lista de puntos turísticos</div>
						<NavLink
							to={allRoutes.manage_puntoturis_new}
							className="text-xs cursor-pointer select-none bg-lime-800 rounded text-zinc-50 py-2 px-5 hover:bg-lime-700"
						>
							Nuevo punto &nbsp;
							<FontAwesomeIcon icon={faAdd} />
						</NavLink>
					</caption>
					<thead className="text-xs text-gray-700 uppercase bg-gray-50">
						<tr>
							<th scope="col" className="px-6 py-3">
								Nombre
							</th>
							<th scope="col" className="px-6 py-3">
								Dirección
							</th>
							<th scope="col" className="px-6 py-3">
								Reservable
							</th>
							<th scope="col" className="px-6 py-3">
								Maravilla
							</th>
							<th className="px-6 py-3" scope="col">Categoría</th>
							<th scope="col" className="px-6 py-3">
								<span className="sr-only">Edit</span>
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
									<td className="px-6 py-4 flex flex-row items-stretch">
										<Link
											to={`${allRoutes.manage_puntoturis_edit}${loc._id}`}
											className="rounded-md shadow-md px-4 py-2 hover:shadow-xl hover:text-blue-500"
										>
											<FontAwesomeIcon icon={faInfoCircle} />
										</Link>
										<div className="mx-1"></div>
										<button
											className="rounded-md shadow-md px-4 py-2 hover:shadow-xl hover:text-red-500"
											onClick={()=>handleDelete(loc._id)}
										>
											<FontAwesomeIcon icon={faTrashAlt} />
										</button>
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

export default ManagePuntoturisIndex;

