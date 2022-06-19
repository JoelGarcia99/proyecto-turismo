import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import PlacesListComponent from "../../components/places/placesListComponent"
import {startFetchingMaravillas} from "../../redux/actions/locations/action.location";

const MaravillasListComponent = () => {
	const dispatch = useDispatch();
	const {loading, maravillas} = useSelector(state => state.locations);

	useEffect(() => {
		// dispatch(startFetchingMaravillas());
	}, []);

	if (loading) {
		return <h1>Cargando...</h1>
	}

	return <div className="mx-3 px-4">
		<div>
			<PlacesListComponent
				title={`Visita nuestras ${maravillas?.length} maravillas`}
				items={maravillas}
			/>
		</div>
	</div>
}

export default MaravillasListComponent
