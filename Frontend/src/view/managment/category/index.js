import {faAdd, faInfoCircle, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {allRoutes} from '../../../router/routes';
import {Link, NavLink} from 'react-router-dom';
import Sidebar from '../../../modules/admin_dashboard/components/Sidebar';
import {startDeletingCategory, startFetchingCategories} from '../../../redux/actions/category/action.category';
import {ToastContainer} from 'react-toastify';
import NoData from '../../../components/feedback/NoData';

const ManageCategoryIndex = () => {

	const dispatch = useDispatch();
	const {categories} = useSelector(state => state.category);
	const [shouldReload, setShouldReload] = useState(false);

	useEffect(() => {
		dispatch(startFetchingCategories());
	}, [dispatch, shouldReload]);

	const handleDelete = (id) => {
		dispatch(
			startDeletingCategory(id, () => {
				setShouldReload(!shouldReload);
			})
		);
	}


	return <div className="max-h-full bg-slate-100">
		<ToastContainer />
		<Sidebar title="Control de Categorías" activeRoute={allRoutes.manage_category} />
		<div className="md:ml-64 w-100 py-5 px-10 bg-slate-100 flex-1">
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left px-4 text-gray-500">
					<caption className="w-full text-xl my-4">
						<div>Control de Categorías</div>
						<NavLink
							to={allRoutes.manage_category_add}
							className="text-xs cursor-pointer select-none bg-lime-800 rounded text-zinc-50 py-2 px-5 hover:bg-lime-700"
						>
							Nueva Categoría &nbsp;
							<FontAwesomeIcon icon={faAdd} />
						</NavLink>
					</caption>
					<thead className="text-xs text-gray-700 uppercase bg-gray-50">
						<tr>
							<th scope="col" className="px-6 py-3">
								Nombre
							</th>
							<th scope="col" className="px-6 py-3">
								Descripción
							</th>
							<th scope="col" className="px-6 py-3">
								Target
							</th>
							<th scope="col" className="px-6 py-3">
								Activa
							</th>
							<th scope="col" className="px-6 py-3">
								Acciones
							</th>
						</tr>
					</thead>
					<tbody>
						{
							categories.map((category) => {
								return <tr key={category._id} className="bg-white border-b ">
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
									>{category.name || "N/A"}</th>
									<td className="px-6 py-4">{category.description || "N/A"}</td>
									<td className="px-6 py-4">{category.target || "N/A"}</td>
									<td className="px-6 py-4">{category.active ? "Sí" : "No"}</td>
									<td className="px-6 py-4 flex flex-row items-stretch">
										<Link
											to={`${allRoutes.manage_category_edit}${category._id}`}
											className="rounded-md shadow-md px-4 py-2 hover:shadow-xl hover:text-blue-500"
										>
											<FontAwesomeIcon icon={faInfoCircle} />
										</Link>
										<div className="mx-1"></div>
										<button
											className="rounded-md shadow-md px-4 py-2 hover:shadow-xl hover:text-red-500"
											onClick={() => handleDelete(category._id)}
										>
											<FontAwesomeIcon icon={faTrashAlt} />
										</button>
									</td>
								</tr>
							})
						}
					</tbody>
				</table>
				{
					categories.length === 0 &&
					<NoData />
				}
			</div>
		</div>
	</div>
};

export default ManageCategoryIndex;

