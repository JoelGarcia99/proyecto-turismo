import {useState} from "react";
import {useDispatch} from "react-redux";
import ImageUploader from "../../../../components/images/component.uploader";
import CustomTextArea from "../../../../components/inputs/CustomTextArea";
import DescriptionInputPanelLayout from "../../../../components/inputs/descriptionInputPanelLayout"
import ResponsiveInput from "../../../../components/inputs/responsiveInput"
import {cleanUndefinedFields} from "../../../../helpers/helper.cleaner";
import useCustomForm from "../../../../hooks/useCustomForm"
import {startUpdatingLocation, startUploadingImage} from "../../../../redux/actions/locations/action.location";

const _TypicPlate = ({touristicPoint}) => {

	const dispatch = useDispatch();
	const [data, setData] = useCustomForm({
		typical_plate: touristicPoint.typical_plate,
		typical_plate_description: touristicPoint.typical_plate_description,
	});

	let imageUrl = touristicPoint.typical_plate_image_url;

	if(imageUrl) {
		imageUrl = process.env.REACT_APP_NG_API_HOST + imageUrl;
	}

	// general data related to the touristic point such as description, name, availability, etc
	const handleSubmit = (e) => {
		e.preventDefault();

		// cleaning all the trash fields
		const newData = cleanUndefinedFields(data);

		// sending only non null fields
		dispatch(startUpdatingLocation({
			_id: touristicPoint._id,
			name: touristicPoint.name,
			...newData
		}));
	}

	// Uploading the image for the guide on the server
	const handleImageUpload = (image, isMainImage = false) => {
		//TODO: lock interface while this is uploading
		dispatch(startUploadingImage(touristicPoint._id, image.file, false, true, () => { }));
	}

	return <DescriptionInputPanelLayout
		title="Plato tipico"
		description="Ingrese los datos del plato tipico del punto turístico"
		isCreate={false}
		onSubmit={handleSubmit}
		child={
			<>
				<ResponsiveInput
					title={"Nombre"}
					placeholder={"Nombre del plato tipico"}
					name={"typical_plate"}
					value={data.typical_plate}
					onChange={setData}
					isRequired={true}
				/>
				<CustomTextArea
					title={"Descripción"}
					name={"typical_plate_description"}
					description={"Ingrese una descripción del plato tipico"}
					placeholder={"Descripción del plato tipico"}
					value={data.typical_plate_description}
					onChange={setData}
					maxLength={400}
				/>
				<ImageUploader 
					circular={false}
					panelWidth={"100%"}
					panelHeight={"20rem"}
					initialUrl={imageUrl}
					handleImageUpload={handleImageUpload}
				/>
			</>
		}
	/>
}

export default _TypicPlate
