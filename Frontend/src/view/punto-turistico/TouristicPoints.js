import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Carousel} from "react-responsive-carousel";
import SessionHeaderComponent from "../../components/header/sessionHeaderComponent";
import SpinLoader from "../../components/loader/SpinLoader";
import PlacesListComponent from "../../components/places/placesListComponent";
import {customHTTPRequest} from "../../helpers/helper.network";
import {allRoutes} from "../../router/routes";
import SessionFooterComponent from "../home/component.footer";

const TouristicPoints = () => {

	const [touristicPoints, setTouristicPoints] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		customHTTPRequest(dispatch,
			`${process.env.REACT_APP_NG_API_HOST}/api/puntos-turisticos`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			}
		}, false).then(res => {
			if (res !== {}) {
				setTouristicPoints(res.data);
			}
		});
	}, [setTouristicPoints]);

	return <div className="flex flex-col justify-between min-h-screen">
		<SessionHeaderComponent currentRoute={allRoutes.puntos_turis} />
		{
			touristicPoints.length === 0 ?
				<SpinLoader message={"Cargando puntos turísticos... espere."} />
				: <Body data={touristicPoints} />
		}
		<SessionFooterComponent />
	</div>;
}

const Body = (data) => {

	function importAll(r) {
		return r.keys().map(r);
	}

	const images = importAll(require.context('../../assets/tours/', false, /\.(svg|webp)$/));

	return <>
		<div id="carousel" className="top-0 absolute">
			<Carousel
				autoPlay={true}
				interval={10000}
				infiniteLoop={true}
				showThumbs={false}
				showStatus={false}
				stopOnHover={false}
				useKeyboardArrows={true}
			>
				{
					images.map((image, index) => {
						return <div key={index}>
							<img src={image} className="object-cover" alt="" style={{height: "85vh"}} />
						</div>

					})}
			</Carousel>
		</div>
		<div style={{marginTop: "80vh"}}>
			<h1 className="text-3xl font-bold text-center uppercase">Visita nuestros puntos turísticos</h1>
			{
				Object.keys(data.data).map((category, index) => {
					return <div key={index}>
						<PlacesListComponent
							title={category === ""? "Otros" : category}
							items={data.data[category]}
						/>
					</div>
				})}
		</div>
	</>;
}

export default TouristicPoints
