import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

import CustomRichText from "../../../../components/inputs/CustomRichText"
import CustomTextArea from "../../../../components/inputs/CustomTextArea"
import DescriptionInputPanelLayout from "../../../../components/inputs/descriptionInputPanelLayout"
import ResponsiveInput from "../../../../components/inputs/responsiveInput"
import ResponsiveSelect from "../../../../components/inputs/responsiveSelect"
import {allRoutes} from "../../../../router/routes"
import AvailabilityFieldSets from "./AvailabilityFieldSets"
import {cleanUndefinedFields } from "../../../../helpers/helper.cleaner";
import {startFetchingCategories} from "../../../../redux/actions/category/action.category"
import {useEffect} from "react"
import useCustomForm from "../../../../hooks/useCustomForm"
import {startRegisteringLocation, startUpdatingLocation} from "../../../../redux/actions/locations/action.location"

const _GeneralForm = ({initS}) => {

	const dispatch = useDispatch();
	const navigator = useNavigate();
	const {categories} = useSelector((state) => state.category);

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
		}, (response) => {
			if (!initS) {
				navigator(allRoutes.manage_puntoturis_edit + response._id);
			}
			// TODO: update current page without recharging the page
			return;
		}));
	}

	const [data, setData, _] = useCustomForm(initS || {
		name: "",
		address: "",
		category: "",
		allow_reservation: true,
		is_wonder: false,
		short_description: "",
		description: "",
	});

	// initial loading of categories
	useEffect(() => {
		dispatch(startFetchingCategories(0, 100));
	}, [dispatch]);

	return <DescriptionInputPanelLayout
		title="Datos generales"
		description="Ingrese los datos generales del punto turístico"
		onSubmit={handleGeneralDataSubmit}
		isCreate={!initS}
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
}

export default _GeneralForm
