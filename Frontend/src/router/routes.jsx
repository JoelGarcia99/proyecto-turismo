import React from 'react'
import {Route, Routes} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setLoginData} from '../redux/actions/auth/action.login';
import {useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
	faChartLine,
	faFish,
	faFolder,
	faLocationArrow,
	faTicketSimple,
	faUser
} from '@fortawesome/free-solid-svg-icons';
import Login from '../view/auth/Login';
import Registro from '../view/auth/Registro';
import Notfound from '../view/404/404';
import Reservation from '../view/reservation/Reservation';
import ManagePanel from '../view/managment/Manage';
import NonAutorized from '../view/404/nonautorized';
import {extractCurrentRoute} from '../middlewares/middleware.route';
import ManageLocal from '../view/managment/manage.local';
import IndexScreen from '../view/home/index';
import HomeScsreen from '../view/home/HomeScsreen';
import AdminmanagmentPanel from '../modules/admin_dashboard';
import PuntoturisAbout from '../view/punto-turistico/details';

import ManagaGuideIndex from '../view/managment/guide';
import ManageGuideCreate from '../view/managment/guide/create';
import ManageGuideUpdate from '../view/managment/guide/update';

import ManagePuntoturisCreate from '../view/managment/puntoturis/create';
import ManagePuntoturisUpdate from '../view/managment/puntoturis/update';
import ManagePuntoturisIndex from '../view/managment/puntoturis';

import ManageCategoryIndex from '../view/managment/category';
import ManageCategoryCreate from '../view/managment/category/create';
import ManageCategoryUpdate from '../view/managment/category/update';
import ManageReservationsIndex from '../view/managment/reservations';
import TouristicPoints from '../view/punto-turistico/TouristicPoints';
import ManageReservationsUpdate from '../view/managment/reservations/update';
import Gastronomia from '../view/gastronomia/Gastronomia';
import ManageGastronomia from '../view/managment/gastronomia/manage.gastronomia';
import Hoteleria from '../view/hoteleria/Hoteleria';
import Arqueologia from '../view/arqueologia/Arqueologia';


const adminRoutes = {
	manage: "/manage",
	manage_puntoturis: "/manage/puntos-turisticos/index",
	manage_puntoturis_new: "/manage/puntos-turisticos/create",
	manage_puntoturis_edit: "/manage/puntos-turisticos/edit/",

	manage_locales: "/manage/puntos-turisticos/locales",
	manage_locales_add: "/manage/puntos-turisticos/locales/new/",
	manage_locales_det: "/manage/puntos-turisticos/locales/detail",

	manage_category: "/manage/category/index",
	manage_category_add: "/manage/category/create/",
	manage_category_edit: "/manage/category/update/",

	manage_guide: "/manage/guias/index/",
	manage_guide_new: "/manage/guias/create/",
	manage_guide_update: "/manage/guias/update/",

	manage_reservation: "/manage/reservations/index/",
	manage_reservation_new: "/manage/reservations/create/",
	manage_reservation_update: "/manage/reservations/update/",

	manage_gastronomia: "/manage/gastronomia",

	// defining routes for admin panel dashboard
	dashboard: "/dashboard"
}

const privateRoutes = {
	reservation: "/reserva",
	puntos_turis: "/puntos-turisticos",
	home: "/home",
	punto_detail: '/punto-turistico/detalles/',
	gastronomia: '/gastronomia',
	hoteleria: '/hoteleria',
	arqueologia: '/arqueologia',
	...adminRoutes, // admin routes are private as well
}

const publicRoutes = {
	login: "/login",
	register: "/registro",
	index: "/",
}


const allRoutes = {
	...privateRoutes,
	...publicRoutes,

}

// List of all menu items in this sidebar
export const available_menus = [
	{
		name: "Dashboard",
		route: allRoutes.dashboard,
		icon: <FontAwesomeIcon icon={faChartLine} />
	},
	{
		name: "Puntos turísticos",
		route: allRoutes.manage_puntoturis,
		icon: <FontAwesomeIcon icon={faLocationArrow} />
	},
	{
		name: "Guías",
		route: allRoutes.manage_guide,
		icon: <FontAwesomeIcon icon={faUser} />
	},
	{
		name: "Categorías",
		route: allRoutes.manage_category,
		icon: <FontAwesomeIcon icon={faFolder} />
	},
	{
		name: "Reservas",
		route: allRoutes.manage_reservation,
		icon: <FontAwesomeIcon icon={faTicketSimple} />
	},

];



const RoutesComponent = () => {
	const location = extractCurrentRoute();

	const dispatch = useDispatch();
	const token = localStorage.getItem("proyecto_turismo-token");
	const user = JSON.parse(localStorage.getItem("proyecto_turismo-user"));
	const {auth} = useSelector(state => state);


	if ((auth === {} || !auth.logged) && user && token) {
		dispatch(setLoginData(user, token));
	}

	//Validando rutas privadas
	for (let value in privateRoutes) {
		if (privateRoutes[value] === location) {
			if (!token || !user) {
				window.location.href = `${process.env.REACT_APP_HOST}/login`;
				return;
			}
		}
	}

	//Validando rutas publicas
	for (let value in publicRoutes) {
		if (publicRoutes[value] === location) {
			if (token && user) {
				window.location.href = `${process.env.REACT_APP_HOST}/home`;
				return;
			}
		}
	}

	//Validando rutas privadas
	for (let value in adminRoutes) {
		if (adminRoutes[value] === location) {
			if (user.role !== `admin`) {
				window.location.href = `${process.env.REACT_APP_HOST}/non-autorized`;
				return;
			}
		}
	}

	return (
		<div>
			<Routes>
				<Route exact path={publicRoutes.index} element={<IndexScreen />} />
				<Route exact path={publicRoutes.login} element={<Login />} />
				<Route exact path={publicRoutes.register} element={<Registro />} />
				<Route exact path={privateRoutes.home} element={<HomeScsreen />} />
				<Route exact path={privateRoutes.puntos_turis} element={<TouristicPoints />} />

				<Route exact path={privateRoutes.reservation} element={<Reservation />} />
				<Route
					exact
					path={privateRoutes.manage_reservation_update + ":id"}
					element={<ManageReservationsUpdate />}
				/>

				<Route exact path={privateRoutes.punto_detail + ":slug"} element={<PuntoturisAbout />} />
				<Route exact path={privateRoutes.manage_puntoturis} element={<ManagePuntoturisIndex />} />
				<Route exact path={privateRoutes.manage_puntoturis_new} element={<ManagePuntoturisCreate />} />
				<Route exact path={privateRoutes.manage_puntoturis_edit + ":id"} element={<ManagePuntoturisUpdate />} />

				<Route exact path={privateRoutes.manage_guide} element={<ManagaGuideIndex />} />
				<Route exact path={privateRoutes.manage_guide_new} element={<ManageGuideCreate />} />
				<Route exact path={privateRoutes.manage_guide_update + ":id"} element={<ManageGuideUpdate />} />

				<Route exact path={privateRoutes.manage_category} element={<ManageCategoryIndex />} />
				<Route exact path={privateRoutes.manage_category_add} element={<ManageCategoryCreate />} />
				<Route exact path={privateRoutes.manage_category_edit + ":id"} element={<ManageCategoryUpdate />} />

				<Route exact path={privateRoutes.manage_reservation} element={<ManageReservationsIndex />} />

				{
				//	Gastronomia
				}
				<Route exact path={privateRoutes.gastronomia} element={<Gastronomia />} />
				<Route exact path={privateRoutes.manage_gastronomia} element={<ManageGastronomia />} />

				{
				//	Hoteleria
				}
				<Route exact path={privateRoutes.hoteleria} element={<Hoteleria />} />

				{
				// Arqueologia
				}
				<Route exact path={privateRoutes.arqueologia} element={<Arqueologia />} />


				<Route exact path={privateRoutes.manage_locales} element={<ManageLocal />} />
				<Route exact path={privateRoutes.manage} element={<ManagePanel />} />
				<Route exact path={privateRoutes.dashboard} element={<AdminmanagmentPanel />} />
				<Route exact path="non-autorized" element={<NonAutorized />} />
				<Route path='*' element={<Notfound />} />
			</Routes>
		</div>
	)
}

export {RoutesComponent, allRoutes};
