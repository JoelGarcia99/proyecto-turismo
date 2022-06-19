import {faAdd, faRemove, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useCustomForm from '../../../hooks/useCustomForm';
import {startFetchingCategories} from '../../../redux/actions/category/action.category';
import {startDeletingPunto, startRegisteringLocation, startUpdatingLocation} from '../../../redux/actions/locations/action.location';
import Sidebar from '../../../modules/admin_dashboard/components/Sidebar';
import {useNavigate} from 'react-router';
import {allRoutes} from '../../../router/routes';
import {startFetchingGuides} from '../../../redux/actions/guideman/action.guideman';
import {Editor} from '@tinymce/tinymce-react';
import FileUploaderComponent from '../../../components/uploader/component.fileUploader';


/**
 * Interface for touristic point creation/update
 *
 **/
const ManagePuntoturisCreate = ({initS}) => {

	const dispatch = useDispatch();
	const navigator = useNavigate();
	const editorRef = useRef(null);

	const {categories} = useSelector((state) => state.category);
	const {guidemen: guides} = useSelector(state => state.guideman);
	const [images, setImages] = useState([]);
	const [mainImage, setMainImage] = useState(null);

	const [linkedGuides, setLinkedGuides] = useState(initS?.guides || []);
	const [data, setData, _] = useCustomForm(initS || {
		name: "",
		address: "",
		slug: "",
		category: "",
		allow_reservation: true,
		is_maravilla: false,
		short_description: "",
		description: "",
		main_image: "",
	});

	// filtering guides to do not repeat it
	let available_guides = guides.filter(guide => {
		for (let index in linkedGuides) {
			if (linkedGuides[index] === guide._id) return false;
		}

		return true;
	});

	// slug value according to the name
	let slug_value = data?.name.replace(new RegExp(' +', 'g'), ' ');
	slug_value = initS ? (data.slug || "") : slug_value.toLowerCase().replace(new RegExp(' ', 'g'), '-');

	// Permanently removes this guide from DB
	const handleDelete = (e) => {
		e.preventDefault();

		dispatch(startDeletingPunto(initS._id, () => {
			navigator(allRoutes.manage_puntoturis);
		}));
	}

	// Removes a guide from the linked guides
	const handleRemoveGuide = (_id) => {
		let linked_guides = linkedGuides.filter(linked_id => linked_id !== _id);

		setLinkedGuides(linked_guides);
	}

	// Adding a touristic point
	const handleSubmit = (e) => {
		e.preventDefault();

		const slug = data.slug || slug_value;
		dispatch((initS ? startUpdatingLocation : startRegisteringLocation)({
			...data,
			slug,
			guides: linkedGuides
		}, () => {
			navigator(allRoutes.manage_puntoturis);
			return;
		}));
	}

	useEffect(() => {
		dispatch(startFetchingCategories(0, 100));
		dispatch(startFetchingGuides(false));
	}, [dispatch]);

	return <form onSubmit={handleSubmit}>
		<Sidebar title="Registrar punto turístico" activeRoute={allRoutes.manage_puntoturis} />
		<div className="box-border md:ml-64 py-3 px-3">
			<div className="md:grid md:grid-cols-3 md:gap-6">
				<div className="md:col-span-1">
					<h3 className="text-lg font-medium leading-6 text-gray-900">Datos generales</h3>
					<p className="mt-1 text-sm text-gray-600">
						Información para que las personas puedan identificar el punto turístico
              </p>
				</div>
				<div className="mt-5 md:mt-0 md:col-span-2">
					<div action="#" method="POST">
						<div className="shadow overflow-hidden sm:rounded-md">
							<div className="px-4 py-5 bg-white sm:p-6">
								<div className="grid grid-cols-6 gap-6">
									<div className="col-span-6 sm:col-span-3">
										<label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
											Nombre
                      </label>
										<input
											type="text"
											name="name"
											required={true}
											value={data.name}
											onChange={(value) => {
												setData(value);

											}}
											placeholder="Nombre del centro turístico"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
										/>
									</div>

									<div className="col-span-6 sm:col-span-3">
										<label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
											Dirección
                      </label>
										<input
											type="text"
											name="address"
											value={data.address}
											onChange={setData}
											placeholder="Localidad, Portoviejo"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
										/>
									</div>
									<div className="col-span-6">
										<label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
											Slug
                      </label>
										<input
											type="text"
											name="slug"
											required={true}
											value={
												data.slug || slug_value
											}
											onChange={setData}
											placeholder="un-formato-de-ruta-amigable"
											id="street-address"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
										/>
									</div>

									{/* Categoria */}
									<div className="col-span-6 sm:col-span-3">
										<label htmlFor="country" className="block text-sm font-medium text-gray-700">
											Categoría
                      </label>

										<select
											name="category"
											onChange={setData}
											className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
										>
											{
												categories?.map((cat) => {
													return <option value={cat.title} key={cat._id}>
														{cat.title}
													</option>
												})
											}

										</select>
									</div>

									<div className="py-5 col-span-6 bg-space-y-6 ">
										<div style={{maxWidth: "8rem"}} onClick={() => {
											//TODO: add a swal
											if (available_guides.length === 0) {
												return;
											}

											setLinkedGuides([
												...linkedGuides,
												available_guides[0]._id,
											]);
										}}
											id="add-guide"
											className="text-sm font-bold cursor-pointer"
										>
											Agregar guia &nbsp;
			<FontAwesomeIcon icon={faAdd} />
										</div>
										<div id="guide-list">
											{
												(linkedGuides || []).map((guide_id, index) => {
													return <div key={index} className="flex flex-row items-center">
														<select
															key={index}
															value={guide_id}
															onChange={(value) => {
																let guides = [...linkedGuides];
																guides[index] = value.target.value;

																setLinkedGuides(guides);
															}}
															className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
														>
															{
																[...available_guides, ...guides.filter(e => e._id === guide_id)].map((guide) => {
																	return <option
																		value={guide?._id}
																		key={guide?._id}
																	>
																		{guide?.identification}&nbsp;|&nbsp;{guide?.name}
																	</option>
																})
															}

														</select>
			      &nbsp;
			      <FontAwesomeIcon
															icon={faRemove}
															className="cursor-pointer ml-3"
															onClick={() => handleRemoveGuide(guide_id)}
														/>
													</div>
												})
											}
										</div>
									</div>
									<div className="py-5 col-span-6 bg-white space-y-6 sm:p-6">
										<fieldset>
											<legend className="text-base font-medium text-gray-900">Sobre disponibilidad</legend>
											<div className="space-y-4">
												<div className="flex items-start">
													<div className="flex items-center h-5">
														<input
															name="allow_reservation"
															checked={data.allow_reservation}
															onChange={(e) => {
																setData({target: {value: Boolean(e.target.checked), name: 'allow_reservation'}});
															}}
															type="checkbox"
															className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
														/>
													</div>
													<div className="ml-3 text-sm">
														<label htmlFor="comments" className="font-medium text-gray-700">
															Permitir reservas
                          </label>
														<p className="text-gray-500">Permitir que turistas reserven este punto</p>
													</div>
												</div>
												<div className="flex items-start">
													<div className="flex items-center h-5">
														<input
															name="is_maravilla"
															checked={data.is_maravilla}
															onChange={(e) => {
																setData({target: {value: Boolean(e.target.checked), name: 'is_maravilla'}});
															}}

															type="checkbox"
															className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
														/>
													</div>
													<div className="ml-3 text-sm">
														<label htmlFor="candidates" className="font-medium text-gray-700">
															Maravilla
                          </label>
														<p className="text-gray-500">Tratar este punto como una maravilla</p>
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
		</div>

		<div className="box-border py-3 px-3 overflow-x-hidden md:ml-64">
			<div className="md:grid md:grid-cols-3 md:gap-6">
				<div className="md:col-span-1">
					<div className="px-4 sm:px-0">
						<h3 className="text-lg font-medium leading-6 text-gray-900">Datos multimedia</h3>
						<p className="mt-1 text-sm text-gray-600">
							Información de presentación del punto turístico.
		El <b>video de presentación</b> solicitado servirá para que el turista se haga una idea
		general del punto turístico.
              </p>
					</div>
				</div>
				<div className="mt-5 md:mt-0 md:col-span-2">
					<div>
						<div className="shadow sm:rounded-md sm:overflow-hidden">
							<div className="px-4 py-5 bg-white space-y-6 sm:p-6">
								<div className="">
									<div className="col-span-4 sm:col-span-2">
										<label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
											Video de presentación
                      </label>
										<div className="mt-1 flex rounded-md shadow-sm">
											<span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
												http://
                        </span>
											<input
												type="text"
												name="presentation_video"
												value={data.presentation_video}
												onChange={setData}
												className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
												placeholder="www.example.com"
											/>
										</div>
										{
											data.presentation_video &&
											<div className="animate__animated animate__fadeIn my-3">
												<iframe
													width="100%"
													height="350rem"
													src={'https://www.youtube.com/embed/' + data.presentation_video.split('v=')[1]}
													title="YouTube video player"
													frameBorder="0"
													allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
													allowFullScreen={true}
												>
												</iframe>
											</div>
										}
									</div>
								</div>

								<div>
									<label htmlFor="about" className="block text-sm font-medium text-gray-700">
										Descripción corta
                    </label>
									<div className="mt-1">
										<textarea
											name="short_description"
											value={data.short_description}
											onChange={setData}
											rows={3}
											maxLength={200}
											className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
											placeholder="Descripción corta del punto"
										/>
									</div>
									<p className="mt-2 text-sm text-gray-500">
										Breve descripcion del punto turistico
                    </p>
								</div>
								<div>
									<label htmlFor="about" className="block text-sm font-medium text-gray-700">
										Descripción completa
                    </label>
									<div className="mt-1">
										<Editor
											apiKey={process.env.REACT_APP_TINY_API}
											onInit={(evt, editor) => editorRef.current = editor}
											value={data.description}
											onEditorChange={(newValue, _) => setData({target: {name: "description", value: newValue}})}
											init={{
												height: 500,
												menubar: false,
												content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
											}}
										/>
									</div>
									<p className="mt-2 text-sm text-gray-500">
										Descripción completa del punto turístico
                    </p>
								</div>
								<div id="main-image">
									<div className="mt-1 rounded-md shadow-sm flex-wrap">
										<FileUploaderComponent
											callback={(file)=>{
												setMainImage(file);
											}}
										/>
										{
											mainImage && <div
												id="img-preview"
												className="animate__animated animate__fadeIn animate__faster my-2 w-max-screen"
											>
												<img className="mx-auto" src={URL.createObjectURL(mainImage)} alt="main image" />
											</div>
										}
									</div>
								</div>

								{/* Images uploader */}
								<div id="images-upload">
									<div className="flex flex-col justify-center wrap overflow-x-scroll">
										{
											images.map((image, index) => {
												return <div className="flex flex-row items-center" key={index}>
													<div className="relative" key={index}>
														<img
															src={image && URL.createObjectURL(image)}
															style={{height: "10rem", width: "10rem", objectFit: "cover"}}
															className="mx-2 my-2" key={index}
														/>
														<span
															onClick={(e) => {
																e.preventDefault();
																//TODO: bug when reuploading the last image
																setImages(images.filter((img, i) => i !== index));
															}}
															className="bg-gray-200 text-red-600 hover:bg-gray-100 rounded-full absolute top-4 right-0 mt-1 mr-2"
															style={{
																display: "inline-block",
																float: "right",
																padding: "0.2rem 0.5rem",
																backgroundColor: "rgba(0,0,0,0.5)",
																borderRadius: "100%",
																cursor: "pointer",
															}}
														>
															<FontAwesomeIcon icon={faTrash} />
														</span>
													</div>
													<textarea
														className="w-full px-8"
														style={{height: "10rem"}}
														resize="none"
														placeholder="Descripción de la imagen"
													>

													</textarea>

												</div>
											})
										}
									</div>
									<FileUploaderComponent callback={(file) => {
										if (file == null || file == "" || file == {}) return;
										setImages([...images.filter(img => img != null), file])
									}} />
								</div>

							</div>
							<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
								{
									initS &&
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
					</div>
				</div>
			</div>
		</div>
	</form>
}

export default ManagePuntoturisCreate
