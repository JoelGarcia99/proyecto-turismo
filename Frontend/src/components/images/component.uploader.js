import {faUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";

/**
 * This component is used to upload images to the server
 *
 * @param {string} initialUrl - the initial url of the image
 * @param {function} handleImageUpload - the function to call when the image is uploaded
 * @param {boolean} circular - whether the image should be circular or not
 * @param {boolean} maxWidth - if the image should expand all the width of the available space
 */
const ImageUploader = ({initialUrl = "", circular=true, panelWidth="100%", panelHeight="10rem", handleImageUpload}) => {

	const [image, setImage] = useState({url: initialUrl});

	// this will transform & split the image object into two
	// elements: the url and the HTML component of the image
	const handleImageChange = (e) => {
		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			setImage({url: reader.result, file});
		}

		// If error then the image should be removed
		try {
			reader.readAsDataURL(file);
		} catch (_) {
			setImage({});
		}
	}

	return <div className="col-span-12">
		<label className="block text-sm font-medium text-gray-700" htmlFor="name">
			Subirimagen
		</label>
		{/* This image should be rounded */}
		{
			image.url &&

			<img
				src={image.url}
				alt=""
				className={`animate__animated animate__fadeIn my-4 ${circular? "rounded-full":"rounded-xl"}`}
				style={{height: circular?"10rem":panelHeight, width: circular?"10rem":panelWidth, objectFit: "cover"}}
			/>
		}
		<input
			type="file"
			name="image_url"
			onChange={handleImageChange}
			className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
		/>
		{
			image.file &&
			<button onClick={()=>handleImageUpload(image)} className="bg-green-700 text-white rounded my-4 px-4 py-2">
				<FontAwesomeIcon icon={faUpload} />&nbsp;Subir
			</button>
		}
	</div>
}



export default ImageUploader
