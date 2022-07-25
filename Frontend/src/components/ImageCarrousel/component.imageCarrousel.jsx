import {useState} from "react";
import {Carousel} from "react-responsive-carousel";
import useWindowDimensions from "../../hooks/hooks.windowDimension";
import CustomModal from "../modal/component.modal";

const ImageCarousel = ({imagesUrls}) => {
	const {width} = useWindowDimensions();

	const [showThumbModal, setShowThumbModal] = useState(false);
	const [selectedImage, setSelectedImage] = useState(
		imagesUrls.length > 0 ? imagesUrls[0] : ""
	);

	return <div className="mx-auto flex-col items-center justify-center" style={{width: "90%"}}>
		<Carousel
			autoPlay={true}
			interval={5000}
			infiniteLoop={false}
			showThumbs={false}
			showStatus={false}
			stopOnHover={false}
			useKeyboardArrows={true}
			centerMode={width >= 768}
			centerSlidePercentage={33.33}
		>
			{
				imagesUrls.map((image, index) => {
					return <div
						onClick={()=>{
							setSelectedImage(image)
							setShowThumbModal(true)
						}}
						className="px-2 cursor-pointer"
						key={index}
					>
						<img
							src={process.env.REACT_APP_NG_API_HOST + image}
							className="object-cover rounded-xl" alt=""
							style={{height: "250px"}}
						/>


					</div>

				})}
		</Carousel>
		<CustomModal
			content={
				<img
					src={process.env.REACT_APP_NG_API_HOST + selectedImage}
					alt="imagen seleccionada"
					style={{width: "50rem", height: "30rem", objectFit: "cover"}}
				/>
			}
			isOpen={showThumbModal}
			onClose={() => setShowThumbModal(false)}
		/>
	</div>
}

export default ImageCarousel;
