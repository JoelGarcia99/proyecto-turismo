import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {startFetchingMaravillas} from "../../redux/actions/locations/action.location";

import {useNavigate} from "react-router-dom";
import MenuComponent from "../../components/header/menuComponent";
import PlacesListComponent from "../../components/places/placesListComponent";
import PublicFooterComponent from "../../components/footer/PublicFooterComponent";

const IndexScreen = () => {

	const dispatch = useDispatch();
	const {loading, maravillas} = useSelector(state => state.locations);
	const {logged} = useSelector(state => state.auth);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(startFetchingMaravillas());
	}, []);

	if (loading) {
		return <h1>Cargando...</h1>
	}

	return <div className="">
		<MenuComponent showMenu={!logged} />
		<br />
		<PlacesListComponent
			title={`Visita nuestras ${maravillas?.length} maravillas`}
			items={maravillas}
		/>
		<PlacesListComponent
			title={`Lugares mejor calificados`}
			items={maravillas}
		/>

		<PublicFooterComponent />
	</div>
	// return <div classNameName="home">
	//     <Header />
	// <div classNameName="post-header">
	//   <div classNameName="welcome">
	//     Vive el momento y hazlo bonito.<br/>Visítanos!
	//     <div classNameName="prepare-res">
	//       <button>Prepara tu reserva</button>
	//     </div>
	//   </div>
	//   <div classNameName="promotional-video">
	//     <video classNameName="intro-vid" controls autoPlay muted >
	// 	<source src={videohome} type="video/mp4"/>
	//     </video>
	//   </div>
	//
	// </div>
	//
	// <main classNameName="main-home">
	//   <h2>Las 7 maravillas de Portoviejo</h2>
	// </main>
	//     <div classNameName="locations">
	//         {
	//             maravillas.map((location) => {
	//                 return <LocationComponent
	//                     key={location.__id}
	//                     location={location}
	// 	      handleClick={()=>{
	// 		dispatch(setCurrent(location));
	// 		navigate(allRoutes.puntoturis);
	// 	      }}
	//                 />
	//             })
	//         }
	//     </div>
	//   <Footer />
	// </div>
}

export default IndexScreen;
