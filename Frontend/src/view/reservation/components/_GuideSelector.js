import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {startFetchingGuides} from "../../../redux/actions/guideman/action.guideman";

/**
 * Creates a component to select/unselect a guide for reservations
 */
const _GuideSelector = ({status, setStatus}) => {

	const dispatch = useDispatch();
	const {guidemen: guides} = useSelector(state => state.guideman);

	// extracting only the guide to work properly
	const {guide} = status;

	// this will select a guide
	const handleGuideSelection = (guide) => {
		setStatus({
			...status,
			guide,
		})
	}

	// this will remove the guide as well as the schedule & other fields which come after it
	const handleGuideDeletion = () => {
		setStatus({
			point: status.point,
			date: status.date
		})
	}

	useEffect(() => {
		dispatch(startFetchingGuides(false))
	}, [dispatch]);

	if (status.date && status.guide) {
		return <>
			<h1 className="text-xl font-bold px-4 my-4">Guia seleccionado! Has elegido a {guide.name}</h1>
			<div className="flex flex-col items-center mx-8 rounded-xl px-2 py-2 cursor-pointer">
				<img
					src={process.env.REACT_APP_NG_API_HOST + guide?.image_url}
					alt=""
					className="animate__animated animate__fadeIn my-4 rounded-full mx-auto"
					style={{height: "10rem", width: "10rem"}}
				/>
				<p className="text-center font-bold uppercase">{guide.name}</p>
				<button
					className="rounded mx-auto border-blue-500 border-solid border-2 px-4 py-2 text-blue-500 uppercase hover:bg-blue-500 hover:text-white"
					onClick={handleGuideDeletion}
				>
					Descartar
				</button>
			</div>
		</>
	}

	else if (status.date) {

		return <>
			<h1 className="text-xl font-bold px-4 my-4">Seleccione el guía del recorrido</h1>

			<div
				className="flex flex-row justify-center"
			>
				{
					guides.map((guide, index) => {
						return <div
							key={index}
							onClick={() => handleGuideSelection(guide)}
							className="mx-8 rounded-xl px-2 py-2 cursor-pointer hover:shadow-xl hover:bg-gray-200"
						>
							<img
								src={`${process.env.REACT_APP_NG_API_HOST}${guide.image_url}`}
								alt=""
								className="animate__animated animate__fadeIn my-4 rounded-full"
								style={{height: "10rem", width: "10rem"}}
							/>
							<p className="text-center font-bold uppercase">{guide.name}</p>
						</div>
					})
				}
			</div>
		</>
	}

	// Return an empty component if the guide is not redy to be showed
	else return <></>;
}

export default _GuideSelector
