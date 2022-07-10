import {faMapLocationDot} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {startFetchingReservables} from "../../../redux/actions/locations/action.location";
import WideDescriptorComponent from "../../home/component.wideDescriptor";

const _PointSelector = ({status, setStatus}) => {

	const dispatch = useDispatch();
	const {reservables} = useSelector(state => state.locations);
	const {point} = status;

	const handlePointSelection = (point) => {
		setStatus({
			...setStatus,
			point,
		})
	}

	const handlePointDeletion = () => {
		setStatus({});
	}


	useEffect(()=>{
		dispatch(startFetchingReservables());
	}, [dispatch]);

	if (point) {
		return <>
			<h1 className="text-xl font-bold px-4 my-4">Punto turistico seleccionado!</h1>
			<WideDescriptorComponent
				title={<span>Excelente decision! Te espera {status.point.name}</span>}
				isTitleInside={true}
				subtitle={<span>Este punto se encuentra ubicado en {status.point.address || "No disponible"}</span>}
				imageUrl={process.env.REACT_APP_NG_API_HOST + status.point.main_image_url}
				details={status.point.short_description}
				buttonText={<span>descartar</span>}
				onClick={handlePointDeletion}
			/>
		</>

	}
	else {
		return <>
			<h1 className="text-xl font-bold px-4">¿Cuál será tu próxima aventura?</h1>

			<div id="reservables" className="mx-2 px-2 flex flex-col justify-start rounded shadow-md">
				{
					reservables.map((reservable, index) => {
						return <div key={index}>
							<WideDescriptorComponent
								buttonText={"Reservar"}
								onClick={handlePointSelection}
								title={reservable.name}
								identification={reservable}
								subtitle={
									<span>
										<FontAwesomeIcon icon={faMapLocationDot} />
										&nbsp;{reservable.address || "No disponible"}
									</span>
								}
								isTitleInside={true}
								details={reservable.short_description ?? ""}
								imageUrl={process.env.REACT_APP_NG_API_HOST + reservable.main_image_url}
								imageLeft={false}
							/>
						</div>
					})
				}
			</div>
		</>
	}
}

export default _PointSelector
