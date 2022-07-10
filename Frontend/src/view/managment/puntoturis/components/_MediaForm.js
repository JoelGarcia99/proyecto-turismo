import {useState} from "react";
import {useDispatch} from "react-redux";
import ImageUploader from "../../../../components/images/component.uploader";
import DescriptionInputPanelLayout from "../../../../components/inputs/descriptionInputPanelLayout";
import {startUploadingImage} from "../../../../redux/actions/locations/action.location";

/**
 * Creates a form to upload & manage media files such as images and videos.
 *
 * @param {object} touristicPoint - The touristic point to manage.
 */
const _MediaForm = ({touristicPoint}) => {

	const dispatch = useDispatch();

	// images upload process
	const initialImageUrl = process.env.REACT_APP_NG_API_HOST + touristicPoint?.main_image_url;

	// list of all the images related to this point.
	const [imageList, setImageList] = useState(touristicPoint?.images ?? []);

	// Uploading the image for the guide on the server
	const handleImageUpload = (image, isMainImage = false) => {
		//TODO: lock interface while this is uploading
		dispatch(startUploadingImage(touristicPoint._id, image.file, isMainImage, false, () => {
			if (isMainImage) {
				setImageList(imageList)
			}
		}));
	}

	// Uploads the main image of the touristic point
	const handleMainImageUpload = (image) => {
		handleImageUpload(image, true);
	}

	return <DescriptionInputPanelLayout
		title="Datos multimedia"
		description="Ingrese los datos multimedia del punto turístico"
		isCreate={false}
		child={
			<div id="main">
				<div id="main-image" className="border-color-gray-200">
					<ImageUploader
						initialUrl={initialImageUrl}
						circular={false}
						title={"Imagen principal"}
						panelHeight={"20rem"}
						handleImageUpload={handleMainImageUpload}
					/>
				</div>
				<div className="my-4"></div>
				<div id="image-list" className="border-color-gray-200">
					<label className="block text-sm font-medium text-gray-700" htmlFor="name">
						Otras imagenes
					</label>
					{/** */}
					<div className="flex flex-row flex-wrap justify-evenly">
						<ImageUploader
							initialUrl={imageList[0] != null ? process.env.REACT_APP_NG_API_HOST + imageList[0] : null}
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
									return <ImageUploader key={index} circular={false} handleImageUpload={handleImageUpload} />
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

export default _MediaForm
