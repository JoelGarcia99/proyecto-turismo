import {Carousel} from "react-responsive-carousel"

/**
 * This is the header content component, it's showed in the
 * header of the home page. This is the carrousel
 */
const HeaderContent = () => {
	function importAll(r) {
		return r.keys().map(r);
	}

	const images = importAll(require.context('../../assets/header/', false, /\.(svg|webp)$/));

	return <div className="top-0 absolute animate__animated animate__fadeInDown animate__faster">
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
}

export default HeaderContent
