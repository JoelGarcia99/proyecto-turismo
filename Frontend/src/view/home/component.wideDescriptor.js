import PropTypes from 'prop-types';
import useWindowDimensions from '../../hooks/hooks.windowDimension';

/**
 * Creates a wide component to describe an element.
 * @param {string} title - The title of the element.
 * @param {string} targetRoute - The route of the element.
 * @param {string} detail - The detail of the element.
 * @param {string} imageUrl - The image url of the element.
 */
const WideDescriptorComponent = ({
	identification = null,
	buttonText = null,
	isTitleInside = false,
	onClick = () => {},
	showButton = true,
	imageLeft = true,
	title,
	subtitle = "",
	details,
	imageUrl
}) => {
	const backgroundColor = "#D9D9D9";

	const {width} = useWindowDimensions();

	// validating width to avoid button go to the top
	if (width < 1024) {
		imageLeft = true;
	}

	const imageDiv = <img
		src={imageUrl}
		className={`flex-1 h-full rounded-2xl h-44 sm:h-80 object-cover`}
	/>;

	const detailDiv =
		<div className="flex flex-col px-3 py-3 w-full lg:w-1/3 justify-evenly align-center">
			{
				isTitleInside &&
				<h1 className="text-2xl md:text-4xl font-extrabold py-2 uppercase font-bold">{title}</h1>
			}
			<h2 className="font-bold">{subtitle}</h2>
			<span>{details}</span>
			{
				showButton &&
				<button
					onClick={() => onClick(identification)}
					className={`px-2 py-2 bg-transparent border-2 border-sky-500 hover:text-white w-full md:w-32 hover:bg-sky-600 text-black rounded-3xl font-bold shadow-2xl ${imageLeft ? "self-end" : "self-start"}`}
				>{buttonText || "Ver detalles"}</button>
			}
		</div>;


	return <div
		className="flex flex-col mx-2 px-14 py-4 animate__animated animate__zoomIn"
	>
		{
			!isTitleInside &&
			<h1 className="text-2xl font-extrabold py-2 uppercase font-bold">{title}</h1>
		}
		<div style={{backgroundColor: backgroundColor}} className="rounded-2xl">
			<div className="py-4 px-4 flex flex-col lg:flex-row align-center justify-center text-justify">
				{
					imageLeft ? <>{imageDiv}{detailDiv}</>
						: <>{detailDiv}{imageDiv}</>
				}
			</div>
		</div>
	</div>
}

WideDescriptorComponent.propTypes = {
	targetRoute: PropTypes.string,
	details: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	imageLeft: PropTypes.bool
}

export default WideDescriptorComponent
