import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useCustomForm from '../../../hooks/useCustomForm';
import {startFetchingCategories} from '../../../redux/actions/category/action.category';
import {startDeletingPunto, startRegisteringLocation, startUpdatingLocation, startUploadingImage} from '../../../redux/actions/locations/action.location';
import Sidebar from '../../../modules/admin_dashboard/components/Sidebar';
import {useNavigate} from 'react-router';
import {allRoutes} from '../../../router/routes';
import {cleanUndefinedFields} from '../../../helpers/helper.cleaner';
import ResponsiveInput from '../../../components/inputs/responsiveInput';
import ResponsiveSelect from '../../../components/inputs/responsiveSelect';
import DescriptionInputPanelLayout from '../../../components/inputs/descriptionInputPanelLayout';
import AvailabilityFieldSets from './components/AvailabilityFieldSets';
import CustomTextArea from '../../../components/inputs/CustomTextArea';
import CustomRichText from '../../../components/inputs/CustomRichText';
import ImageUploader from '../../../components/images/component.uploader';


/**
 * Interface for touristic point creation/update
 * guides={guides}
 *
 **/
const ManagePuntoturisCreate = ({initS}) => {

	const dispatch = useDispatch();
	const navigator = useNavigate();

	const {categories} = useSelector((state) => state.category);

	// images upload process
	const initialImageUrl = process.env.REACT_APP_NG_API_HOST + initS?.main_image_url;

	// list of all the images related to this point.
	const [imageList, setImageList] = useState(initS?.images ?? []);

	const [data, setData, _] = useCustomForm(initS || {
		name: "",
		address: "",
		category: "",
		allow_reservation: true,
		is_wonder: false,
		short_description: "",
		description: "",
	});

	// Permanently removes this guide from DB
	const handleDelete = (e) => {
		e.preventDefault();

		dispatch(startDeletingPunto(initS._id, () => {
			navigator(allRoutes.manage_puntoturis);
		}));
	}

	// general data related to the touristic point such as description, name, availability, etc
	const handleGeneralDataSubmit = (e) => {
		e.preventDefault();

		// cleaning all the trash fields
		const newData = cleanUndefinedFields(data);

		// removing non useful fields
		delete newData.main_image_url;

		// sending only non null fields
		dispatch((initS ? startUpdatingLocation : startRegisteringLocation)({
			...newData
		}, () => {
			navigator(allRoutes.manage_puntoturis);
			return;
		}));
	}

	// Adding a touristic point. Only normal data, do not add any file or media
	// content since the backend will drop them all.
	const handleSubmit = (e) => {
		e.preventDefault();

		// cleaning all the trash fields
		const newData = cleanUndefinedFields(data);

		// sending only non null fields
		dispatch((initS ? startUpdatingLocation : startRegisteringLocation)({
			...newData,
		}, () => {
			navigator(allRoutes.manage_puntoturis);
			return;
		}));
	}
	//
	// Uploading the image for the guide on the server
	const handleImageUpload = (image, isMainImage = true) => {
		//TODO: lock interface while this is uploading
		dispatch(startUploadingImage(initS._id, image.file, isMainImage, ()=>{
			setImageList(imageList)
		}));
	}

	// initial loading of categories
	useEffect(() => {
		dispatch(startFetchingCategories(0, 100));
	}, [dispatch]);

	return <form onSubmit={handleSubmit}>
		<Sidebar title="Registrar punto turístico" activeRoute={allRoutes.manage_puntoturis} />
		<DescriptionInputPanelLayout
			title="Datos generales"
			description="Ingrese los datos generales del punto turístico"
			onClick={handleGeneralDataSubmit}
			isUpdate={!initS}
			child={
				<>
					<ResponsiveInput
						title="Nombre"
						name="name"
						value={data.name}
						onChange={setData}
						placeholder="Nombre del punto turístico"
					/>
					<ResponsiveInput
						title="Dirección"
						name="address"
						value={data.address}
						onChange={setData}
						placeholder="Dirección del punto turístico"
					/>

					{/* Categoria */}
					<ResponsiveSelect
						title="Categoría"
						name="category"
						setData={setData}
						data={categories}
						valueProp="name"
						displayProp="name"
					/>
					<CustomTextArea
						title="Descripción corta"
						name="short_description"
						value={data.short_description}
						onChange={setData}
						placeholder="Descripción corta del punto turístico"
						maxLength={200}
						description="Ingrese una descripción corta del punto turístico"
					/>

					<CustomRichText
						title="Descripción"
						name="description"
						value={data.description}
						onChange={setData}
						description="Ingrese una descripción del punto turístico"
					/>


					<br />
					<AvailabilityFieldSets
						data={data}
						setData={setData}
					/>
				</>
			}
		/>
		<hr />
		{/* Multimedia data - Only showed if editing */}
		{
			initS &&
			<DescriptionInputPanelLayout
				title="Datos multimedia"
				description="Ingrese los datos multimedia del punto turístico"
				isUpdate={initS}
				child={
					<div id="main">
						<div id="main-image" className="border-color-gray-200">
							<h1 className="text-xl font-bold">Imagen principal</h1>
							<ImageUploader
								initialUrl={initialImageUrl}
								circular={false}
								panelHeight={"20rem"}
								handleImageUpload={handleImageUpload}
							/>
						</div>
						<div className="my-4"></div>
						<div id="image-list" className="border-color-gray-200">
							<h1 className="text-cl font-bold flex flex-row items-center">
								<span>Otras imagenes</span>
							</h1>
							{/** */}
							<div className="flex flex-row flex-wrap justify-evenly">
								<ImageUploader
									initialUrl={imageList[0] != null ? process.env.REACT_APP_NG_API_HOST + imageList[0]: null}
									handleImageUpload={handleImageUpload}
									showButtons={!imageList[0]}
									circular={false}
									maxWidth={false}
									showTitle={!imageList[0]}
								/>
								{
									imageList.map((_, index) => {

										// if index is 0 then it means that it is the main image, so we 
										// do not need to rerender it again
										if (imageList.length === 1 || index === imageList.length - 1) {
											return <ImageUploader key={index} circular={false} handleImageUpload={handleImageUpload}/>
										}

										// showing a new image uploader
										return <ImageUploader
											key={index}
											initialUrl={process.env.REACT_APP_NG_API_HOST + imageList[index + 1]}
											showTitle={false}
											handleImageUpload={handleImageUpload}
											showButtons={false}
											circular={false}
											maxWidth={false}
										/>
									})
								}
							</div>
						</div>
					</div>
				}
			/>
		}

		{
			!!initS &&
			<button className="btn">
				Eliminar
			</button>
		}
	</form>
}

export default ManagePuntoturisCreate
