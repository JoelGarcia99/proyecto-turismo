import {Carousel} from "react-responsive-carousel";
import FlipImageDescriptor from "../../components/flipCard/component.flipImageDesc";
import SessionHeaderComponent from "../../components/header/sessionHeaderComponent";
import {allRoutes} from "../../router/routes";
import SessionFooterComponent from "../home/component.footer";

const Hoteleria = () => {
	function importAll(r) {
		return r.keys().map(r);
	}

	const images = importAll(require.context('../../assets/header/', false, /\.(svg|webp)$/));

	return <div>
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
			Hoteleria
		</h1>
		<div className="mx-8 mb-8 text-xl border-box" id="descriptor">
			Disfruta de los mejores platillos. 
			La gastronomía quiteña es una mezcla de saberes y sabores ancestrales con propuestas 
			de vanguardia que conquistan los paladares de propios y extraños
		</div>

		<div id="platos" className="mb-16 mx-8 px-2 flex flex-row flex-wrap justify-center">
			<FlipImageDescriptor
				imageUrl={"https://i1.wp.com/decomidaperuana.com/wp-content/uploads/2017/08/caldo-de-gallina-receta.png?resize=474%2C439&ssl=1"}
				title="Caldo de gallina"
				desc={"Descripcion del caldo de gallina"}
			/>
			<FlipImageDescriptor
				imageUrl={"https://tourdelviajero.com/wp-content/uploads/resultado-de-imagen-de-ceviche-ecuatoriano-497x330.jpeg"}
				title="Ceviche"
				desc={"Descripcion del ceviche"}
			/>
			<FlipImageDescriptor
				imageUrl={"https://www.cocina-ecuatoriana.com/base/stock/Recipe/193-image/193-image_web.jpg"}
				title={"Bollo"}
				desc={"Descripcion del bollo"}
			/>
		</div>
		<h1 id="festivales" className="px-8 py-8 text-3xl font-semibold uppercase">
			Festivales gastronomicos
		</h1>

		<SessionFooterComponent />
	</div>
}

export default Hoteleria;
