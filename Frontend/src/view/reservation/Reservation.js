
import {faLocationDot, faLocationPin} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Carousel} from 'react-responsive-carousel';
import {useNavigate} from 'react-router';
import SessionHeaderComponent from '../../components/header/sessionHeaderComponent';
import SpinLoader from '../../components/loader/SpinLoader';
import useCustomForm from '../../hooks/useCustomForm';
import {startFetchingGuides} from '../../redux/actions/guideman/action.guideman';
import {startFetchingReservables} from '../../redux/actions/locations/action.location';
import {startSavingReservation} from '../../redux/actions/reservations/action.reservation';
import {allRoutes} from '../../router/routes';
import SessionFooterComponent from '../home/component.footer';
import _Header from './_Header';
import _GuideSelector from './components/_GuideSelector';
import _PointSelector from './components/_PointSelector';
import _ScheduleSelector from './components/_ScheduleSelector';
import _DateSelector from './components/_DateSelector';

const Reservation = ({isUpdate = false}) => {

	const dispatch = useDispatch();

	const [status, setStatus] = useState({
		point: null,
		date: null,
		guide: null,
		schedule: null,
	});

	function importAll(r) {
		return r.keys().map(r);
	}
	const images = importAll(require.context('../../assets/header/', false, /\.(svg|webp)$/));

	return (
		<div className="w-full flex flex-col justify-start align-center">
			<SessionHeaderComponent
				currentRoute={allRoutes.reservation}
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
			<div style={{height: "75vh"}}></div>
			<_PointSelector status={status} setStatus={setStatus} />
			<_DateSelector status={status} setStatus={setStatus} />
			<_GuideSelector status={status} setStatus={setStatus} />
			<_ScheduleSelector status={status} setStatus={setStatus} />
			<SessionFooterComponent />
		</div>
	);
}

export default Reservation;
