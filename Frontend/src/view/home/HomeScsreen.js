import SessionHeaderComponent from "../../components/header/sessionHeaderComponent"
import {allRoutes} from "../../router/routes"
import HeaderContent from "./component.headerContent"

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import MaravillasListComponent from "./component.maravillas";

import morcillaImage from "../../assets/others/FESTIVAL DE LA MORCILLA PARROQUIA ABDÓN CALDERÓN.webp";
import hotelImage from "../../assets/others/HOTEL CEIBO REAL.webp";
import arqueoImage from "../../assets/others/PARQUE ARQUEOLÓGICO  HOJAS JABONCILLO.webp";
import WideDescriptorComponent from "./component.wideDescriptor";
import SessionFooterComponent from "./component.footer";
import {Link, useNavigate} from "react-router-dom";


const HomeScsreen = () => {

	const navigator = useNavigate();

	return <>
		<div className="flex flex-col justify-start align-center">
			<SessionHeaderComponent
				currentRoute={allRoutes.home}
			/>
			<HeaderContent />
			<div className="container mx-auto sm:text-center lg:text-left px-10 flex flex-col lg:flex-row justify-between" style={{marginTop: "80vh"}}>
				<h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
					<span className="block xl:inline w-full">Disfruta el momento y <br /></span>{' '}
					<span className="block w-full text-green-600 xl:inline"> hazlo inolvidable</span>
				</h1>
				<div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
					<div className="">
						<Link
							to={allRoutes.reservation}
							className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
						>
							Haz tu reserva!
						</Link>
					</div>
				</div>
			</div>
			<MaravillasListComponent />
			<WideDescriptorComponent
				title="La mejor gastronomía manabita"
				onClick={() => {
					navigator(allRoutes.gastronomia);
				}}
				imageLeft={false}
				imageUrl={morcillaImage}
				details="La maravilla es una experiencia que te permite disfrutar de una comida que no te parece familiar, pero que te da la oportunidad de disfrutar de una experiencia que te hará sentir muy feliz. La maravilla es una experiencia que te permite disfrutar de una comida que no te parece familiar, pero que te da la oportunidad de disfrutar de una experiencia que te hará sentir muy feliz. "
			/>

			<WideDescriptorComponent
				title="Zona arquológica"
				imageUrl={arqueoImage}
				onClick={() => {
					navigator(allRoutes.arqueologia)
				}}
				details="La maravilla es una experiencia que te permite disfrutar de una comida que no te parece familiar, pero que te da la oportunidad de disfrutar de una experiencia que te hará sentir muy feliz. La maravilla es una experiencia que te permite disfrutar de una comida que no te parece familiar, pero que te da la oportunidad de disfrutar de una experiencia que te hará sentir muy feliz. "
			/>
			<WideDescriptorComponent
				title="Hotelería"
				imageLeft={false}
				onClick={() => {
					navigator(allRoutes.hoteleria)
				}}
				imageUrl={hotelImage}
				details="La maravilla es una experiencia que te permite disfrutar de una comida que no te parece familiar, pero que te da la oportunidad de disfrutar de una experiencia que te hará sentir muy feliz. La maravilla es una experiencia que te permite disfrutar de una comida que no te parece familiar, pero que te da la oportunidad de disfrutar de una experiencia que te hará sentir muy feliz. "
			/>
			<SessionFooterComponent />
		</div>
	</>
}

export default HomeScsreen
