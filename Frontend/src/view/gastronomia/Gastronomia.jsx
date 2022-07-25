import {faLocationDot, faLocationPinLock, faMap} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Carousel} from "react-responsive-carousel";
import {toast, ToastContainer} from "react-toastify";
import FlipImageDescriptor from "../../components/flipCard/component.flipImageDesc";
import SessionHeaderComponent from "../../components/header/sessionHeaderComponent";
import SpinLoader from "../../components/loader/SpinLoader";
import {customHTTPRequest} from "../../helpers/helper.network";
import {allRoutes} from "../../router/routes";
import SessionFooterComponent from "../home/component.footer";

const Gastronomia = () => {

	const dispatch = useDispatch();
	const [platos, setPlatos] = useState(null);

	useEffect(async () => {
		const url = `${process.env.REACT_APP_NG_API_HOST}/api/gastronomy`;
		// fetching touristic points but only with desired fields
		const response = await customHTTPRequest(dispatch, url, {
			method: "GET",
		}, false);

		if (response !== {}) {
			setPlatos(response.data);
		}
		else {
			toast("No se pudieron obtener los platos", {
				type: "error",
				autoClose: 5000,
				position: "top-right",
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	}, [dispatch]);

	function importAll(r) {
		return r.keys().map(r);
	}

	const images = importAll(require.context('../../assets/header/', false, /\.(svg|webp)$/));

	return <div>
		<ToastContainer />
		<SessionHeaderComponent
			currentRoute={allRoutes}
		/>

		<div className="top-0 absolute animate__animated animate__fadeInDown animate__faster">
			<Carousel
				autoPlay={true}
				interval={5000}
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
		<h1 id="title" style={{marginTop: "30rem"}} className="px-8 py-8 text-3xl font-semibold uppercase">
			Gastronomia
		</h1>
		<div className="mx-8 mb-8 text-xl border-box" id="descriptor">
			Disfruta de los mejores platillos.
			La gastronomía quiteña es una mezcla de saberes y sabores ancestrales con propuestas
			de vanguardia que conquistan los paladares de propios y extraños
		</div>

		{
			!platos && <SpinLoader />
		}
		<div id="platos" className="mb-16 mx-8 px-2 flex flex-row flex-wrap justify-center">
			{
				platos?.map((plato) => {

					const imageUrl = `${process.env.REACT_APP_NG_API_HOST}${plato.typical_plate_image_url}`;

					return <div>
						<FlipImageDescriptor
							imageUrl={imageUrl}
							title={plato.typical_plate}
							desc={
								<div className="flex flex-col justify-between h-full items-center px-2 relative">
									<h1 className="text-xl uppercase text-black font-semibold">
										{plato.typical_plate}
									</h1>
									<br />
									
									<h2 className="text-sm text-justify">
										{plato.typical_plate_description}
									</h2>
									<br />
									
									<h3 className="w-full text-md float-left text-left font-semibold">
										<FontAwesomeIcon icon={faMap} /> &nbsp; {plato.name}
										<br />
										<>
											<FontAwesomeIcon icon={faLocationDot} /> &nbsp; {plato.address}
										</>
									</h3>
								</div>
							}
						/>
					</div>
				})
			}
		</div>
		<h1 id="festivales" className="px-8 py-8 text-3xl font-semibold uppercase">
			Festivales gastronomicos
		</h1>

		<SessionFooterComponent />
	</div>
}

export default Gastronomia;
