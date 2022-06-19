import {faFacebook, faInstagram, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import logo from "../../assets/logoFinal.png";
import FooterMenuComponent from "./component.footMenu";

const SessionFooterComponent = () => {

	return <div className="bg-green-800 mx-auto flex flex-col md:flex-row justify-evenly w-full px-4 py-4">
		<div id="info" style={{minWidth: "10rem"}}className="flex flex-col items-center my-8 self-center">
			<img src={logo} alt="" style={{width: "7rem", height:"7rem"}}/>
			<div id="social-media">
				<a target="_blank" href="https://www.facebook.com/" className="text-white mx-2 hover:text-3xl text-2xl"><FontAwesomeIcon icon={faFacebook} /></a>
				<a target="_blank" href="https://www.instagram.com/" className="text-white hover:text-3xl mx-2 text-2xl"><FontAwesomeIcon icon={faInstagram} /></a>
				<a target="_blank" href="https://www.twitter.com/" className="text-white hover:text-3xl mx-2 text-2xl"><FontAwesomeIcon icon={faTwitter} /></a>
				<a target="_blank" href="https://www.youtube.com/" className="text-white hover:text-3xl mx-2 text-2xl"><FontAwesomeIcon icon={faYoutube} /></a>
			</div>
		</div>
		<div id="links" className="flex flex-row flex-wrap lg:justify-center justify-start">
			<FooterMenuComponent
				title="Descubre"
				items={[
					{
						title: "Recorridos Turísticos",
						href: "#"
					},
					{
						title: "Gastronomia",
						href: "#"
					},
					{
						title: "Zonas arqueologicas",
						href: "#"
					},
					{
						title: "Servicios Turísticos",
						href: "#"
					}
				]}
			/><FooterMenuComponent
				title="Actividaes Turísticas"
				items={[
					{
						title: "Festival Gastronómico",
						href: "#"
					},
					{
						title: "Parapente",
						href: "#"
					},
					{
						title: "Actividades Nocturnas",
						href: "#"
					}
				]}
			/><FooterMenuComponent
				title="Contáctanos"
				items={[
					{
						title: "GAD del cantón Portoviejo",
						href: "https://www.portoviejo.gob.ec/contacto/#"
					},
					{
						title: "Portoparques",
							href: "mailto:info@portoparque.gob.ec",
					},
					{
						title: "+593 968674332",
						href: "tel:+593 968674332"
					}
				]}
			/>
		</div>
	</div>
}

export default SessionFooterComponent
