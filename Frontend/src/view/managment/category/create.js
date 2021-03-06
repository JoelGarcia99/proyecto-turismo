import React from 'react';
import {useDispatch} from 'react-redux';
import useCustomForm from '../../../hooks/useCustomForm';
import Sidebar from '../../../modules/admin_dashboard/components/Sidebar';
import {useNavigate} from 'react-router';
import {allRoutes} from '../../../router/routes';
import {startDeletingCategory, startRegisteringCategory} from '../../../redux/actions/category/action.category';
import CustomTextArea from '../../../components/inputs/CustomTextArea';


const ManageCategoryCreate = ({initS}) => {

	const dispatch = useDispatch();
	const navigator = useNavigate();

	const [data, setData, _] = useCustomForm(initS || {
		name: "",
		description: "",
	});

	const handleDelete = (e) => {
		e.preventDefault();

		dispatch(
			startDeletingCategory(initS._id, () => {
				navigator(allRoutes.manage_category);
			})
		);
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(startRegisteringCategory({_id: initS?._id, ...data}, !!initS, () => {
			navigator(allRoutes.manage_category);
		}));
	}

	return <form onSubmit={handleSubmit}>
		<Sidebar title="Registrar Guía" activeRoute={allRoutes.manage_category} />
		<div className="box-border md:ml-64 py-3 px-3">
			<div className="md:grid md:grid-cols-3 md:gap-6">
				<div className="md:col-span-1">
					<div className="px-4 sm:px-0">
						<h3 className="text-lg font-medium leading-6 text-gray-900">Datos personales</h3>
						<p className="mt-1 text-sm text-gray-600">
							Información personal sobre el guía. Este guía puede estar asociado a varios puntos
							turísticos.
						</p>
					</div>
				</div>
				<div className="mt-5 md:mt-0 md:col-span-2">
					<div>
						<div className="shadow overflow-hidden sm:rounded-md">
							<div className="px-4 py-5 bg-white sm:p-6">
								<div className="grid grid-cols-6 gap-6">
									<div className="col-span-12">
										<label htmlFor="cellphone" className="block text-sm font-medium text-gray-700">
											Título
										</label>
										<input
											type="text"
											name="name"
											required={true}
											value={data.name}
											onChange={(value) => {
												setData(value);
											}}
											placeholder="Título"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
										/>
									</div>

									<div className="col-span-12">
										<CustomTextArea
											description={"Breve Descripción de la categoría"}
											title={"Descripción"}
											name="description"
											required={true}
											value={data.description}
											onChange={setData}
											maxLength={3000}
											placeholder="Descripción"
										/>
									</div>
									<br />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div className="hidden sm:block" aria-hidden="true">
			<div className="py-5">
				<div className="border-t border-gray-200" />
			</div>
			<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
				{/* Delete button */}
				{initS &&
					<button
						onClick={handleDelete}
						className="inline-flex justify-center mr-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Eliminar
					</button>
				}

				<button
					type="submit"
					className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					{!initS && "Crear" || "Actualizar"}
				</button>


			</div>
		</div>
	</form>
}

export default ManageCategoryCreate
