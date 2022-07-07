import {faAdd, faRemove, faUpload} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import useCustomForm from '../../../hooks/useCustomForm';
import Sidebar from '../../../modules/admin_dashboard/components/Sidebar';
import {useNavigate} from 'react-router';
import {allRoutes} from '../../../router/routes';
import {startDeletingGuide, startRegisteringGuide, startUploadingImage} from '../../../redux/actions/guideman/action.guideman';
import {add, format} from 'date-fns';
import ImageUploader from '../../../components/images/component.uploader';


const ManageGuideCreate = ({initS}) => {

	const dispatch = useDispatch();
	const navigator = useNavigate();

	// Creating a copy to work with. 
	// WARNING: do not use this for validation since this is never null or undefined
	const initialState = {...initS};

	const initialImageUrl = initS?.image_url? `${process.env.REACT_APP_NG_API_HOST}/images/guides/${initS.image_url}`:"";

	// The image will not be uploaded to the server with all the other params
	delete initialState.image_url;

	const [schedules, setSchedules] = useState(initialState?.schedules || []);
	const [data, setData, _] = useCustomForm(initialState || {
		name: "",
		cedula: "",
		phone: "",
		is_active: false
	});

	// handle deletion of a whole guide
	const handleDelete = (e) => {
		e.preventDefault();

		dispatch(
			startDeletingGuide(initialState._id, () => {
				navigator(allRoutes.manage_guide);
			})
		);
	}

	// Uploading the image for the guide on the server
	const handleImageUpload = (image) => {
		//TODO: lock interface while this is uploading
		dispatch(startUploadingImage(initS._id, image.file));
	}

	// handling deletion of a single schedule. The [key] referes to 'from' or 'to'
	const handleScheduleDelete = (index, key, value) => {
		let new_schedules = [...schedules];
		new_schedules[index][key] = value;

		setSchedules(new_schedules);
	}

	// trigger a save action in Redux and stores/update current guide in database
	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(startRegisteringGuide(
			{_id: initialState?._id, ...data, schedules}, !!initS, () => {
				navigator(allRoutes.manage_guide);
			}
		));
	}

	return <form onSubmit={handleSubmit}>
		<Sidebar title="Registrar Guía" activeRoute={allRoutes.manage_guide} />
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
									{
										initS &&
											<ImageUploader
												initialUrl={initialImageUrl}
												handleImageUpload={handleImageUpload}
											/>
									}
									<div className="col-span-12">
										<label className="block text-sm font-medium text-gray-700" htmlFor="name">
											Nombre
										</label>
										<input
											type="text"
											name="name"
											required={true}
											value={data.name}
											onChange={setData}
											placeholder="Nombre del guía"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
										/>
									</div>
									<div className="col-span-6 sm:col-span-3">
										<label htmlFor="phone" className="block text-sm font-medium text-gray-700">
											Teléfono
										</label>
										<input
											type="text"
											name="phone"
											required={true}
											value={data.phone}
											onChange={(value) => {
												setData(value);

											}}
											placeholder="0999999999"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
										/>
									</div>

									<div className="col-span-6 sm:col-span-3">
										<label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
											Cédula
										</label>
										<input
											type="number"
											name="cedula"
											value={data.cedula}
											onChange={setData}
											placeholder="0000000000"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
										/>
									</div>
									<div className="col-span-12">
										<label htmlFor="street-address" className="flex-row flex text-sm font-medium text-gray-700">
											Horarios &nbsp;
											<div
												className="flex flex-row items-center px-1 text-white text-xs rounded" style={{backgroundColor: "green", cursor: "pointer"}}
												onClick={() => {
													setSchedules([
														...schedules,
														{
															from: Date.now(),
															to: add(Date.now(), {hours: 2}).getTime()
														}
													])
												}}
											>
												Nuevo
												&nbsp;
												<FontAwesomeIcon icon={faAdd} />
											</div>
										</label>
										{
											schedules.map((schedule, index) => {
												return <div key={index} className="flex flex-row flex-wrap justify-evenly items-center my-2 shadow-md rounded px-2 py-2" >
													<span className="text-sm w-min">Desde</span> &nbsp;
													<input
														type="datetime-local"
														value={format(new Date(schedule.from), "yyyy-MM-dd'T'HH:mm")}
														onChange={(e) => handleScheduleDelete(index, 'from', (new Date(e.target.value)).getTime())}
														required={true}
														className="form-control block w-min px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
													/> &nbsp;
													<span className="text-sm w-min">hasta</span> &nbsp;
													<input
														type="datetime-local"
														value={format(new Date(schedule.to), "yyyy-MM-dd'T'HH:mm")}
														onChange={(e) => handleScheduleDelete(index, 'to', (new Date(e.target.value)).getTime())}
														required={true}
														className="form-control block w-min px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
													/> &nbsp;

													<button
														onClick={(e) => {
															e.preventDefault();
															setSchedules(schedules.slice(0, -1));
														}}
													><FontAwesomeIcon icon={faRemove} /></button>
												</div>
											})
										}
									</div>

									<div className="py-5 col-span-6 bg-white space-y-6 sm:p-6">
										<fieldset>
											<legend className="text-base font-medium text-gray-900">Sobre disponibilidad</legend>
											<div className="space-y-4">
												<div className="flex items-start">
													<div className="flex items-center h-5">
														<input
															name="is_active"
															checked={!!data.is_active}
															onChange={(e) => {
																setData({target: {value: Boolean(e.target.checked), name: 'is_active'}});
															}}
															type="checkbox"
															className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
														/>
													</div>
													<div className="ml-3 text-sm">
														<label htmlFor="comments" className="font-medium text-gray-700">
															Marcar como disponible
														</label>
														<p className="text-gray-500">Permitir asignar este guía a algún centro turístico</p>
													</div>
												</div>
											</div>
										</fieldset>
									</div>

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

export default ManageGuideCreate
