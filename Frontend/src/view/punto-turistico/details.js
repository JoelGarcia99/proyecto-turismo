import {faCar, faClock, faLocationDot} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import sanitizeHtml from 'sanitize-html';
import {useParams} from 'react-router';
import SessionHeaderComponent from '../../components/header/sessionHeaderComponent';
import {allRoutes} from '../../router/routes';
import {randomColorSet} from '../../helpers/helper.ui';
import SessionFooterComponent from '../home/component.footer';
import {Carousel} from 'react-responsive-carousel';
import useWindowDimensions from '../../hooks/hooks.windowDimension';
import WideDescriptorComponent from '../home/component.wideDescriptor';
import morcillaImage from "../../assets/others/FESTIVAL DE LA MORCILLA PARROQUIA ABDÓN CALDERÓN.webp";
import hotelImage  from "../../assets/others/HOTEL CEIBO REAL.webp";
import arqueoImage from "../../assets/others/PARQUE ARQUEOLÓGICO  HOJAS JABONCILLO.webp";

const PuntoturisAbout = () => {

	const {slug} = useParams();
	const [isLoading, setLoading] = useState(false);
	const [punto, setPunto] = useState({});

	useEffect(() => {
		fetch(`${process.env.REACT_APP_NG_API_HOST}/api/punto-turistico/${slug}`).then(async (response) => {
			const jsonRes = await response.json();

			if (response.status === 200) {
				const punto = jsonRes.data;
				setPunto(punto);
			}

			// if loading is false and there is no data, then it's a 404 error
			setLoading(false);
		})
	}, [slug]);

	// Image height neceesary since background is floating
	const imageHeight = "85vh";
	// margin after the main background image
	const globalMarginTop = "0vh";

	const borderRadius = "1rem";

	if (isLoading) {
		return <h1>Loading</h1>;
	}

	return <div className="puntoturis-about">

		<SessionHeaderComponent
			currentRoute={allRoutes}
		/>
		{/* Background image	    */}
		<main
			style={{top: "0", height: imageHeight, zIndex: "-1", backgroundImage: `url(${punto.main_image})`}}
			className="w-full fixed bg-cover py-3 px-4"
		>
		</main>

		<div
			className="w-80 py-4 my-28 mx-8 rounded text-white text-center px-2 py-2"
			style={{backgroundColor: "rgba(20, 20, 20, 0.8)"}}
		>
			<h1 className="mx-auto text-2xl font-bold uppercase">{punto.name}</h1>
			<small className="text-xs"><FontAwesomeIcon icon={faLocationDot} />&nbsp;&nbsp;{punto.address}</small>
			<hr style={{backgroundColor: "red", border: "none", borderTop: "1px solid white"}} />
			<br /><span style={{marginTop: "10rem", textAlign: "justify !important"}} >{punto.short_description}</span>
		</div>

		<div
			id="title-div"
			className="px-8 w-full md:w-3/5 py-4 text-5xl font-bold uppercase"
			style={{
				marginTop: globalMarginTop,
				backgroundColor: randomColorSet(),
				borderTopRightRadius: borderRadius,
				borderBottomRightRadius: borderRadius,
			}}
		>
			<h1 className="text-white">{punto.name}</h1>
		</div>

		<div className="bg-white">
			<div className="flex flex-col lg:flex-row w-full px-4 py-8" style={{marginTop: "1rem"}}>
				<div
					className="prose-lg w-full lg:w-3/5 px-8 animate__animated animate__fadeInLeft" style={{textAlign: "justify"}}
					dangerouslySetInnerHTML={{__html: sanitizeHtml(punto.description)}}
				></div>
				<div className="nx-20 flex flex-col">
					<img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.weather-forecast.com%2Fplace_maps%2Fcr%2FCrucita-1.8.gif&f=1&nofb=1" alt="" />

					<div id="distance" className="flex flex-row items-center">
						<FontAwesomeIcon icon={faCar} />
						<p>
							<b className="font-bold mx-2">Distancia: </b>
							<span>75 Km</span>
						</p>
					</div>
					<div id="time" className="flex flex-row items-center">
						<FontAwesomeIcon icon={faClock} />
						<p>
							<b className="font-bold mx-2">Tiempo:</b>
							<span>2 horas, 45 minutos</span>
						</p>
					</div>

				</div>
			</div>
			{/* Image Gallery */}
			<div id="img-gallery" className="bg-white">
				<h1 className="text-xl px-8 font-bold uppercase my-2">Imágenes</h1>
				<div id="carrousel py-4 w-full">
					<GalleryCarrousel />
				</div>
			</div>
			{/* Video Gallery */}
			<div id="vid-gallery" style={{marginTop: "4rem"}}>
				<h1 className="text-xl px-8 font-bold uppercase my-2">videos</h1>
				<div id="carrousel py-4 w-full">
					<GalleryCarrousel />
				</div>
			</div>
			{/* Description content */}
			<WideDescriptorComponent
				title="Plato típico"
				imageLeft={false}
				imageUrl={morcillaImage}
				showButton={false}
				details="La maravilla es una experiencia que te permite disfrutar de una comida que no te parece familiar, pero que te da la oportunidad de disfrutar de una experiencia que te hará sentir muy feliz. La maravilla es una experiencia que te permite disfrutar de una comida que no te parece familiar, pero que te da la oportunidad de disfrutar de una experiencia que te hará sentir muy feliz. "
			/>
			{/* Footer */}
			<SessionFooterComponent />
		</div>
	</div>
}

const GalleryCarrousel = () => {

	function importAll(r) {
		return r.keys().map(r);
	}

	const {width} = useWindowDimensions();
	const images = importAll(require.context('../../assets/header/', false, /\.(svg|webp)$/));

	return <div className="mx-auto flex-col items-center justify-center" style={{width: "90%"}}>
		<Carousel
			autoPlay={true}
			interval={5000}
			infiniteLoop={true}
			showThumbs={true}
			showStatus={false}
			stopOnHover={false}
			useKeyboardArrows={true}
			centerMode={width >= 768}
			centerSlidePercentage={33.33}

		>
			{
				images.map((image, index) => {
					return <div key={index} className="px-2">
						<img src={image} className="object-cover rounded-xl" alt="" />
					</div>

				})}
		</Carousel>
	</div>
}

export default PuntoturisAbout
