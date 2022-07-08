import ImageUploader from "../components/images/component.uploader";

/**
 * This method will create an array of image uploader containers
 */
export const generateImageUploaders = (n, handleImageUpload) => {
	const imageUploaders = [];
	for (let i = 0; i < n; i++) {
		imageUploaders.push(
			<ImageUploader
				key={i}
				setData={setData}
				data={data}
			/>
		);
	}
	return imageUploaders;
}
